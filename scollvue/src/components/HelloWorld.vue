<template>
  <div class="big">
   <div class="goods">
    <div class="menu-wrapper" ref='menuWrapper'>
      <ul class="menu-ul">
        <li :class="{'current':currentIndex===val}" class="menu-item" 
        v-for="(item,val) in iindex" @click="menuclick(val)">
        <span class="text">{{item}}</span>
       
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref='foodsWrapper'>
      <ul class="food-ul">
        <li class="food-item food-list-hook" v-for="item in goods">
          <div class="content">
            <span class="text">{{item}}</span>     
          </div>
          <div class="sperate"></div>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
  
  import BScroll from 'better-scroll'

  export default {
    data(){
      return{
        iindex:[11,22,33,44,55,66,77,88,99],
        goods:[1,2,3,4,5,6,7,8,9],
        RightHeight:[],
        scrollY:0
        }
      },
    created(){
     this.$nextTick(() => {
            this._initscroll();
            this._calculateHeight();
          });
    },
    computed:{
      currentIndex(){
        for(let i=0;i<this.RightHeight.length;i++){
          let upheight=this.RightHeight[i];
          let downheight=this.RightHeight[i+1];
          if(!downheight||(this.scrollY>upheight&&this.scrollY<downheight)){
            return i;
          }
        }
        return 0;
      }
    },
    methods:{
      _initscroll(){
        this.menuscroll=new BScroll(this.$refs.menuWrapper,{
          click:true
        }),
        this.foodscroll=new BScroll(this.$refs.foodsWrapper,{
          click:true,
          probeType:3
        }),
        this.foodscroll.on('scroll',(pos)=>{
          this.scrollY=Math.abs(Math.round(pos.y))
        })
      },
      menuclick(index){
        let LeftList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el=LeftList[index];
        this.foodscroll.scrollToElement(el,300);
      },
      _calculateHeight(){
        let LeftList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height=0;
        this.RightHeight.push(height);
        for (let i =0; i < LeftList.length; i++) {
          let RightItem=LeftList[i];
          height+=RightItem.clientHeight;
          this.RightHeight.push(height);
        }
        console.log(this.RightHeight)
      }
    }
  };
  
</script>

<style lang="stylus" rel="stylesheet/stylus">
 .goods
    display flex
    position absolute
    top 0px
    bottom 0px
    height 400px
    width 100%
    overflow hidden /*超过的部分隐藏*/
    .menu-wrapper
      flex: 0 0 80px
      width 80px
      background #f3f5f7
      .menu-ul
        list-style-type none
        padding 0
        margin 0
        .menu-item
          display table /*能够很好的垂直居中*/
          height 54px
          width 56px
          padding 0 12px
          line-height 14px
          list-style-type none
          vertical-align middle
          .text
            position:relative
            top 15px
            vertical-align middle
        .current
          display table /*能够很好的垂直居中*/
          height 54px
          width 56px
          padding 0 12px
          line-height 14px
          list-style-type none
          background yellow
          font-weight 700
    .foods-wrapper
      width 100%
      .food-ul
        padding 0
        list-style-type none
        .sperate
          position:absolute
          height 1px
          width 100%
          background grey 
        .food-item
          display flex 
          height 160px
          align right
          padding-bottom 18px
          &:last-child
            padding-bottom 0px
          .content
            .text
              font-size 50px
              margin-left 100px  
              color red
              font-weight 500
            
 
</style>
