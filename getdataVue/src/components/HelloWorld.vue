<template>
  <div class="hello">
    <h1>{{ msg1 }}</h1>
    <button @click="getdataByresource">点击我获取json数据</button>
    <ul>
      <li v-for="item in Ddata">{{item.name}}: ￥{{item.price}}</li>
    </ul>
    <h1>{{ msg2 }}</h1>
    <button @click="_getdatabyAxios">点击我获取百度新闻</button>
    <ul class="newul">
      <li class="newli" v-for="(item,val) in Nnew">{{val+1}}:{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
  import {getdatabyAxios} from '../api/getdatabyAxios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      Nnew:[],
      Ddata:[],
      msg1: '通过vueresource获取json中的数据',
      msg2: '通过axios获取百度新闻的数据'
    }
  },
  methods:{
    getdataByresource(){
       this.$http.get("/root/goods").then((response)=>{
         if(response.body.errnum===0){
           this.Ddata=response.body.data[0].foods
         }
         //console.log(response.body.data[0].foods)
         //console.log("++"+this.Ddata)
       })
    },
    _getdatabyAxios(){
      getdatabyAxios().then((res)=>{
        if(res.errno===0) {
          var Ttop=res.data.top;
          var Tnew= res.data.news;
          this.Nnew=Ttop.concat(Tnew)
          /*console.log(Ttop)
          console.log(Tnew)
          console.log(this.Nnew)*/
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .newul{
    position: absolute;
    left:30%;
    width:40%;
    align-items: center;
  }
  .newli{
    padding: 3px;
    padding-left:20px;
    color:red;
    font-size: 20px;
    text-align: left;
    border-bottom: 1px solid black;
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
