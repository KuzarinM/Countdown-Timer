<!-- <script setup>
  import $ from "jquery"; 
  import APIHelper from "./mixins/APIHelper.js";
  import { RouterLink, RouterView } from 'vue-router';
  import {Countdown} from 'vue3-flip-countdown'
</script> -->

<script>
    import $ from "jquery"; 
  import APIHelper from "./mixins/APIHelper.js";
  import { RouterLink, RouterView } from 'vue-router';
  import {Countdown} from 'vue3-flip-countdown'

  export default 
  {
    mixins:[APIHelper],
    components:{Countdown},
    data(){
      return{
        timers:[
          {
            name:"1 сентября",
            deadline:new Date(2023,8,1,10,0,0)
          },
          {
            name:"Новый год",
            deadline:new Date(2024,0,1,0,0,0)
          },
        ],
        data:Array
      }
    },
    methods:{
      loadData(){
        

        this.sortData()
      },
      sortData(){
        this.data = this.timers.sort((a,b)=>a.deadline>b.deadline);
        console.log(this.timers)
      },
      toTwoDigits(number){
        var d = `${number}`
        if(d.length==1){
          d = `0${d}`
        }
        return d
      },
      printData(dateTime){
        return  `${this.toTwoDigits(dateTime.getDate())}.${this.toTwoDigits(dateTime.getMonth()+1)}.${dateTime.getFullYear()}
         ${this.toTwoDigits(dateTime.getHours())}:${this.toTwoDigits(dateTime.getMinutes())}`
      },
      toDateFirmat(dt){
        var m = this.toTwoDigits(dt.getMonth()+1)
        var d = this.toTwoDigits(dt.getDate())

        return `${dt.getFullYear()}-${m}-${d}`
      },
      toTimeFormat(dt){
        var h = this.toTwoDigits(dt.getHours());
        var m = this.toTwoDigits(dt.getMinutes());

        return `${h}:${m}`
      },
      toDate(date,time){
        var dArr = date.split("-")
        var tArr = time.split(":")
        return new Date(parseInt(dArr[0]), parseInt(dArr[1])-1, parseInt(dArr[2]), parseInt(tArr[0]), parseInt(tArr[1],0))
      },
      addData(){
        var newTimer = {
          name:$("#name_line_new").val(),
          deadline:this.toDate($("#date_line_new").val(),$("#time_line_new").val())
        }
        console.log(newTimer);
        this.timers.push(newTimer);
        this.sortData()
        $("#modal_close").click()
      },
      deleteData(index){
        //Да, удалить что-то в js это ооочень плохо и сложно. Так что реализую потом, как только сделаю себе БД
        $("#modal_close").click()
      },
      saveData(){

      }
    },
    mounted(){
      this.loadData();
    }
  }
</script>

<template>
  <header class="mx-1">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalId">Изменить</button>
  </header>
  <article class="d-flex flex-column">
    <div class="d-flex flex-column panel mx-auto" v-for="(item, index) in this.data">
      <h1 class="mx-auto">{{ item.name }}</h1>
      <Countdown 
      :labels="{days:'дней', hours:'часов', minutes:'минут', seconds:'секунды'}" 
      :deadlineDate="item.deadline" />
      <small class="text-center">{{
      this.printData(item.deadline)
        }}</small>
    </div>
  </article>
  <div class="modal fade" id="modalId" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalTitleId">Настройка таймеров</h5>
            <button id="modal_close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex mb-3" v-for="(item, index) in this.data">
            <div class="m-3">
              <label for="" class="form-label">Название</label>
              <input type="text" class="form-control" :id="`name_line_${index}`"
               :value="item.name" readonly>
            </div>
            <div class="m-3">
              <label for="" class="form-label">Дата</label>
              <input type="date" class="form-control" :id="`date_line_${index}`" 
              :value="this.toDateFirmat(item.deadline)" readonly>
            </div>
            <div class="m-3">
              <label for="" class="form-label">Время</label>
              <input type="time" class="form-control" :id="`date_line_${index}`" 
              :value="this.toTimeFormat(item.deadline)" readonly>
            </div>
            <button type="button" class="btn btn-danger my-3">Удалить</button>
          </div>
        </div>

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
          <button type="button" class="btn btn-primary">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
  
  <!--<RouterView />-->
</template>

<style scoped>
</style>
