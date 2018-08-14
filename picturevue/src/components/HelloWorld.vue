<template>
  <div class="hello">
    <button class="but" @click="show()">click</button>
      <div class="pic">
        <transition name="move">
            <div class="picul" v-show="showpic" ref="scrollUl">
              <ul class="pic-list" ref="List">
                <li ><img src="../assets/logo.png"></li>
                <li ><img src="../assets/logo.png"></li>
                <li ><img src="../assets/logo.png"></li>
                <li ><img src="../assets/logo.png"></li>
                <li ><img src="../assets/logo.png"></li>
                <li ><img src="../assets/logo.png"></li>
                <li ><img src="../assets/logo.png"></li>
              </ul>
           </div>
        </transition>
      </div> 
  </div>
</template>

<script> 
  import BScroll from 'better-scroll'

export default {

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      showpic:false
    }
  },
  created(){
      this.init();
  },
  methods:{
    show(){
      if(this.showpic==false){
        this.showpic=true
      }else{
         this.showpic=false
      }
      
    },
    
    init(){
      
      this.$nextTick(()=>{
          this.$refs.List.style.width=900+'px';
         this.picScroll=new BScroll(this.$refs.scrollUl,{
              scrollX:true,//滚动的方向是x轴方向
              eventPassthrough:'vertical'//滚动的时候禁止原来界面的上下滑动
        });
          console.log("1"+this.$refs.List.style.width)
      })
     
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.but {
  position: absolute;
  top:30%;
  left:550px;
  width: 50px;
  height:30px;
}
.pic{
   position: absolute;
   top:40%;
   left: 350px;
   width: 500px;
   height: 180px;
   overflow: hidden;
   white-space: nowrap;
   background: yellow;
}
.pic-list{
 
}

.picul{
   position: absolute;
  list-style-type: none; 
  width: 220%;
   overflow: hidden;
  transition: all 2s ease;
}
.move-enter{
  transform: translate3d(-150%, 0, 0)
}
.move-leave-to{
  transform: translate3d(150%, 0, 0)
}
.move-enter-to,.move-leave{
  transform: translate3d(0, 0, 0)
}
li{
  display:inline-block;
  width: 150px;
  height:150px;
  margin-left: 16px;
  border-style:double;
  background: grey;
}
img{
  width: 150px;
}
</style>
