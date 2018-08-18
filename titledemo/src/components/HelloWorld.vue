<template>
  <div class="hello">
    <div class="first">
      <div class="first-wrapper" ref="firstWrapper">
        <ul class="first-ul">
          <li class="firstli first-list-hook" v-for="items in this.Date">
            <span class="firstli-span">{{items.Fname}}</span>
            <div class="second" v-for="item in items.second">
              {{item.Sname}}
              </div>
          </li>
        </ul>
        <div class="fixdiv" ref="fix">
          <span class="fixtitle"> {{fixedTitle}}</span>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
export default {
  data () {
    return {
      Date:[],
      listHeight:[],
      scrollY:-1,
      currentIndex:0,
      distance:-1
    }
  },
  created(){
    this.$http.get('/demo/first').then((response)=>{
      var res=response.body;
      if(res.errno===0){
        this.Date=res.data;
        this.$nextTick(()=>{
          this.init();
          this._calculateHeight()
        })

      }
    })
  },
  computed:{
    fixedTitle(){
      return this.Date[this.currentIndex]?this.Date[this.currentIndex].Fname:''
    },
    /*currentIndex() {
      for (let i = 0; i < this.listHeight.length;i++) {
        //获取每个item的高度区间
        let height1=this.listHeight[i];
        let height2=this.listHeight[i+1];
        if(!height2 ||(this.scrollY >= height1&this.scrollY < height2)){
          return i;
        }
      }
      return 0;
    },*/
  },
  watch: {

    scrollY(newY) {//监听歌手列表的滚动
      const listHeight = this.listHeight
      //当滚动到中间的时候
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (!height2 || (newY >= height1 &&newY < height2)) {
          this.currentIndex = i
          this.distance=height2-newY
          return
        }
      }
    },
    distance(newVal){
      let fixtop=(newVal>0&&newVal<35)?newVal-35:0
      if(this.fixtop==fixtop){
        return
      }
      this.fixtop=fixtop
      this.$refs.fix.style.transform=`translate3d(0,${fixtop}px,0)`
      console.log(newVal+"+"+newVal)
    }
  },
  methods:{
    init(){
      this.firstscroll=new BScroll(this.$refs.firstWrapper,{
        click:true,
        probeType:3
      }),
        this.firstscroll.on('scroll',(pos)=>{
          //scrollY：foodsScroll在滚动时的高度
          this.scrollY=Math.abs(Math.round(pos.y));
        })

    },
    _calculateHeight() {
      let firstList = this.$refs.firstWrapper.getElementsByClassName('first-list-hook');
      //alert(foodList.length);
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < firstList.length; i++) {
        let item=firstList[i];
        height += item.clientHeight;
        this.listHeight.push(height);

      }
      console.log(this.listHeight)
    },
   /* normal(obj){
      var arr = []
      for (var i in obj) {
        arr.push(obj[i]);
      }
      return arr;
    }*/
    /*scroll(pos){//子组件派发的函数
      this.scrollY=pos.y
    },*/
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul{
  list-style-type:none;
  padding:0;
}
.first{
   position: absolute;
    top:-13px;
   width: 100%;
   overflow:hidden;
 }
.first-wrapper{
  width: 100%;
  height:667px;

}

  .firstli{
    display: table;
    height: 84px;
    width: 100%;
    background: grey;
  }
  .firstli-span{
    padding-left: 20px;
    line-height: 38px;
  }
  .second{
    text-align: center;
    background: yellow;
    margin-bottom: 1px;
  }
  .fixdiv{
    position: absolute;
    top: 13px;
    left: 0;
    width: 100%;
    height: 38px;
    background: grey;
  }
  .fixtitle{
    padding-left: 20px;
    margin-top: 200px;
  }
</style>
