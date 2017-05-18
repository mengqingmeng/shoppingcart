/**
 * Created by mqm on 2017/5/13.
 */
var vm = new Vue({
    el:"#app",
    data:{
        totalMoney:0,
        productList:[],
        checkAllFlag:false,
        delFlag:false,
        curProduct:''
    },
    filters:{
        formatMoney:function(value){
            return "￥"+ value.toFixed(2)
        }
    },
    mounted:function(){
        this.$nextTick(function () {
            this.cartView();
        })
    },
    methods:{
        cartView:function () {
            var _this = this;
            this.$http.get("data/cartData.json",{"id":123}).then(function (res) {
                _this.productList = res.data.result.list;
                //_this.totalMoney = res.data.result.totalMoney;
            })
        },
        changeCount:function (product,option) {
            if (option >0){
                product.productQuantity++;
            }else {
                product.productQuantity--;
                if (product.productQuantity < 2)
                    product.productQuantity = 1
            }
            this.caclTotalPrice()
        },
        selectedProduct:function (product) {
            if (typeof product.checked == 'undefined'){
                this.$set(product,"checked",true)
            }else{

                product.checked =!product.checked
            }
            this.caclTotalPrice()
        },
        checkAll:function (flag) {
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function (product,index) {
                if (typeof product.checked == 'undefined'){
                    _this.$set(product,"checked",_this.checkAllFlag)
                }else{
                    product.checked =_this.checkAllFlag
                }
            })
            this.caclTotalPrice()
        },
        caclTotalPrice:function () {
            this.totalMoney = 0
            var _this = this;
            this.productList.forEach(function (product,index) {
                if (product.checked){
                    _this.totalMoney += product.productPrice * product.productQuantity
                }
            })

        },
        delConfirm:function(item){
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct:function () {
            var index = this.productList.indexOf(this.curProduct)
            this.productList.splice(index,1)
            this.delFlag=false
        }
    }
});

Vue.filter("money",function (value,type) {
    return "￥"+ value.toFixed(2) + type
})