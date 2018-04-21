new Vue({
		el:"#app",
		data:{
			productlist:[],
			checkAllFlag:false,
			totalMoney:0,
			delFlag:false,
			deleitem:''
		},
		filters:{
			formatmoney:function(value){
				return "￥"+value.toFixed(2);
			}
		},
		mounted:function(){
			this.$nextTick(function(){
				this.cartView();
				//this.addq();
			})
			
		},
		methods:{
			cartView:function(){
				this.$http.get("data/cartData.json").then(res=>{
					this.productlist=res.data.result.list; 
					//_this.productQuantity = res.data.result.list.productQuantity;
				});
			},
			addq:function(project,num){
				project.productQuantity += num;

				if(project.productQuantity<0){
					project.productQuantity = 0;
				}
				this.calulate();
		    },
		    chose:function(item){
		    	if( typeof item.checked == 'undefined'){
		    		this.$set(item, 'checked',true);
		    	}
		    	else{
		    		item.checked = !item.checked;
		    	}
		    	this.calulate();
			},
			checkAll:function(flag){
				this.checkAllFlag=flag;
				var _this=this;
				this.productlist.forEach(function(item,index){
					if( typeof item.checked == 'undefined'){
		    		_this.$set(item, 'checked',_this.checkAllFlag);
		    	}
		    	else{
		    		item.checked =_this.checkAllFlag;
		    	}
				})
				this.calulate();
			},
			calulate:function(){
				var _this = this;
				this.totalMoney = 0;
				this.productlist.forEach(function(item,index){
					if(item.checked){
						_this.totalMoney += item.productQuantity * item.productPrice;
					}
				})
			},
			dele:function(item){
				this.delFlag = true;
				this.deleitem = item;
				//var index = 
			},
			close:function(){
				this.delFlag=false;
			},
			alldele:function(){
				var index = this.productlist.indexOf(this.deleitem);
				this.productlist.splice(index,1);
			}
		}
})

Vue.filter("money",function(value,type){
	return "￥"+value.toFixed(2)+type;
})