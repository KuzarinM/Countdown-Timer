<script>
    import $ from "jquery"; 
    import {Countdown} from 'vue3-flip-countdown'
    import {sql} from "@vercel/postgres";

  export default 
  {
    components:{Countdown},
    data(){
      return{
        timers:[],//date from DB
        data:Array,//sorted date(show on page)
        updates:false,//Update flag to fix Countdown problem!!!
      }
    },
    methods:{
      async loadData(){
        this.timers = (await sql`SELECT * FROM deadlines;`).rows;//Load data from DB 
        console.debug(this.timers);  
        this.data = this.timers.sort((a,b)=>new Date(a.deadline) - new Date(b.deadline));//Sort timers by deadline 
        console.debug(this.data);
      },
      async addData(){
        var newTimer = {
          name:$("#name_line_new").val(),
          deadline:this.toDate($("#date_line_new").val(),$("#time_line_new").val())
        };//Create object for simple
        console.debug(newTimer);

        if(newTimer.name==null || newTimer.name=="" || !this.isValidDate(newTimer.deadline)) {
          alert("Некоректные данные!!!");
          return;
        }
        //delete date from Form
        $("#name_line_new").val("");
        $("#date_line_new").val("");
        $("#time_line_new").val("");
        await sql`INSERT INTO deadlines (name, deadline) values (${newTimer.name}, ${newTimer.deadline})`;//Insert data to DB

        this.updates = true;//We need to reload page on close
        await this.loadData();
      },
      async deleteData(id, name){
        if(!confirm(`Вы действительно хотите удалить событие ${name}?`)) return;//Check for delete

        await sql`DELETE FROM deadlines WHERE id = ${id}`;//Delete from DB

        this.updates = true;//We need to reload page on close
        await this.loadData();
      },
      async updateData(id, name){
        if(!confirm(`Вы действительно хотите обновить таймер со старым назанием ${name}`)) return ;//Chek for update

        var timer = {
          id:id,
          name:$(`#name_line_${id}`).val(),
          deadline:this.toDate($(`#date_line_${id}`).val(), $(`#time_line_${id}`).val())
        };//Creating object for simple
        console.log(timer);

        if(timer.name==null || timer.name=="" || !this.isValidDate(timer.deadline)) {
          alert("Некоректные данные!!! Обновление невозможно.");
          return;
        }

        await sql`UPDATE deadlines SET (name, deadline) = (${timer.name}, ${timer.deadline}) WHERE id = ${timer.id}`;//Update DB 

        this.updates = true;//We need to reload page on close
        await this.loadData();
      },
      closeModal(){
        if(this.updates) location = location;//Countdown component do not support simple vue update... And this is the only way
        else $("#modal_close").click();
      },
      //small function to convertation and output....
      isValidDate(d) {
        //test object on valid Date object
        return d instanceof Date && !isNaN(d);
      },
      toTwoDigits(number){
        //one digit number output in format 0d
        var d = number.toString();
        if(d.length == 1) return `0${d}`;
        return d;
      },
      printData(dateTime){
        //convert Date to string (format DD.MM.YYYY hh:mm:ss)
        return  `${this.toTwoDigits(dateTime.getDate())}.${this.toTwoDigits(dateTime.getMonth()+1)}.${dateTime.getFullYear()}
         ${this.toTwoDigits(dateTime.getHours())}:${this.toTwoDigits(dateTime.getMinutes())}`
      },
      toDateFirmat(dt){
        //Date convert to string(format YYYY-MM-DD)
        return `${dt.getFullYear()}-${this.toTwoDigits(dt.getMonth()+1)}-${this.toTwoDigits(dt.getDate())}`
      },
      toTimeFormat(dt){
        //Date(time part) convert to string(format hh:mm)
        return `${this.toTwoDigits(dt.getHours())}:${this.toTwoDigits(dt.getMinutes())}`
      },
      toDate(date,time){
        //convert 2 string(date and time) to Date object 
        var dArr = date.split("-")
        var tArr = time.split(":")
        return new Date(parseInt(dArr[0]), parseInt(dArr[1])-1, parseInt(dArr[2]), parseInt(tArr[0]), parseInt(tArr[1],0))
      },
    },
    async mounted(){
      var process = this.process//Thanks vue for 'good' system of env. Without this do not work DB
      await this.loadData();
    }
  }
</script>

<template>
  <header class="mx-1 d-none d-md-flex justify-content-between">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalId">Изменить</button>
    <a class="link-success m-3" href="https://github.com/KuzarinM/Countdown-Timer">Исходный код (github)</a>
  </header>
  <article class="d-flex flex-column">
    <div class="d-flex flex-column panel mx-auto bacgrounded" v-for="(item, index) in this.data">
      <h1 class="mx-auto">{{ item.name }}</h1><!-- title -->
      <Countdown 
      :labels="{days:'дней', hours:'часов', minutes:'минут', seconds:'секунды'}" 
      :deadlineDate="item.deadline"
      :mainFlipBackgroundColor="'#6ce1d6'"
      :secondFlipBackgroundColor="'#6ce1d6'"
      :mainColor="'#124f07'"
      :secondFlipColor="'#124f07'" /><!-- countdown timer -->
      <small class="text-center">{{ this.printData(item.deadline) }}</small><!-- deadline date and time -->
    </div>
  </article>

  <!--Модальное окно-->
  <div class="modal fade" id="modalId" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <!--Header of modal window-->
        <div class="modal-header">
          <h5 class="modal-title" id="modalTitleId">Настройка таймеров</h5>
            <button id="modal_close" type="button" class="btn-close hide" data-bs-dismiss="modal" aria-label="Close"></button>
            <button type="button" class="btn-close" @click="this.closeModal()"></button>
        </div>
        <!--Body of modal window-->
        <div class="modal-body">
          <div class="d-flex mb-3" v-for="(item, index) in this.data">
            <div class="m-3">
              <label for="" class="form-label">Название</label>
              <input type="text" class="form-control" :id="`name_line_${item.id}`"
               :value="item.name">
            </div>
            <div class="m-3">
              <label for="" class="form-label">Дата</label>
              <input type="date" class="form-control" :id="`date_line_${item.id}`" 
              :value="this.toDateFirmat(item.deadline)">
            </div>
            <div class="m-3">
              <label for="" class="form-label">Время</label>
              <input type="time" class="form-control" :id="`time_line_${item.id}`" 
              :value="this.toTimeFormat(item.deadline)" >
            </div><!--In some browsers(fierfox) type="datetime" do not work... And this psrt is nessesary!-->
            <button type="button" class="btn btn-danger m-3" @click="this.deleteData(item.id, item.name)">Удалить</button>
            <button type="button" class="btn btn-info m-3" @click="this.updateData(item.id, item.name)">Изменить</button>
          </div>
        </div>
        <!--Add deadline field-->
        <div class="modal-footer"> 
          <div class="d-flex">
            <div class="m-3">
              <label for="" class="form-label">Название</label>
              <input type="text" class="form-control" :id="`name_line_new`" >
            </div>
            <div class="m-3">
              <label for="" class="form-label">Дата</label>
              <input type="date" class="form-control" :id="`date_line_new`">
            </div>
            <div class="m-3">
              <label for="" class="form-label">Время</label>
              <input type="time" class="form-control" :id="`time_line_new`" >
            </div>
          </div>
          <button type="button" class="btn btn-success" @click="addData">Добавить</button>
          <!-- <button type="button" class="btn btn-primary" @click="saveData">Сохранить</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bacgrounded{
  background-color: #daebd4;
}
</style>
