new Vue({
	el:".address",
	data:{
		addresslist:[],
		limititem:3,
		currentIndex:0,
		shopmethod:1
	},
	mounted:function(){
		var _this=this;
		this.$nextTick(function(){
			_this.adressView();
			
		})
	},
	computed:{
		showitem:function(num){
			return this.addresslist.slice(0,this.limititem);
		}
	},
	methods:{
		adressView:function(){
			this.$http.get("data/address.json",{}).then((response) => {
				this.addresslist = response.data.result;
				});
		},
		setDefault:function(addressId){
			this.addresslist.forEach(function(item,index){
				if(addressId==item.addressId){
					item.isDefault = true;
				}else{
					item.isDefault =false;
				}
			})
		}
	}
})