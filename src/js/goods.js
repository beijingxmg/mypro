/**
 * Created by Administrator on 2017-06-12.
 */

(function(Vue){
   new Vue({
       el:'.checkout',
       data:{
           proArr:[],
           countPrice:0,
           allSelect:false,
           isShow:false,
           proIndex:0
       },
       methods:{
           selectPro:function (obj) {
               obj.checked=!obj.checked;
               var allSel=true;
               this.proArr.forEach(function (value,key) {
                   if(value.checked==false){
                       allSel=false;
                   }
               });
               this.allSelect=allSel;
               this.calAllPrice();
           },
           proSel:function (opt) {
               this.proArr.forEach(function (value,key) {
                   value.checked=opt;
               });
               this.allSelect=opt;
               this.calAllPrice();
           },
           num:function (obj,opt) {
               if(opt){
                   obj.productQuentity++;
               }else{
                   obj.productQuentity--;
                   if(obj.productQuentity<=1){
                       obj.productQuentity=1;
                   }
               }
               this.calAllPrice();
           },
       //    计算总价
           calAllPrice:function () {
               var total=0;
               this.proArr.forEach(function (value,key) {
                   if(value.checked){
                       total+=(value.productQuentity*value.productPrice);
                   }
               });
               this.countPrice=total;
           },
       //    删除
           dele:function (index) {
               this.isShow=true;
               this.proIndex=index;
               // this.proArr.splice()
           },
           confirmDel:function () {
               this.proArr.splice(this.proIndex,1);
               this.isShow=false;
           },
           think:function () {
               this.isShow=false;
           }
       },
       mounted:function () {
           this.$http.get('images/data/cart.json').then(function (res) {
               // console.log(res.data.result.productList);
               this.proArr=res.data.result.productList;
               this.calAllPrice();
           },function (error) {

           })
       },
       filters:{
           number:function (input) {
               // alert(0);
               return input.toFixed(2);
           }
       }
   });
    

})(Vue);