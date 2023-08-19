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
            deadline:new Date(2023,9,1,10,0,0)
          },
          {
            name:"Новый год",
            deadline:new Date(2024,1,1,0,0,0)
          },
        ],
        data:Array
      }
    },
    methods:{
      loadData(){
        

        this.data = this.timers.sort((a,b)=>a.deadline>b.deadline);
        console.log(this.timers)
      },
    },
    mounted(){
      this.loadData();
    }
  }
</script>

<template>
  <header class="mx-1">
    
  </header>
  <article class="d-flex flex-column">
    <div class="d-flex flex-column panel mx-auto" v-for="item in this.data">
      <h1 class="mx-auto">{{ item.name }}</h1>
      <Countdown 
      :labels="{days:'дней', hours:'часов', minutes:'минут', seconds:'секунды'}" 
      :deadlineDate="item.deadline" />
    </div>
  </article>

  
  <!--<RouterView />-->
</template>

<style scoped>
</style>
