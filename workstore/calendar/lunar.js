/*
	原文地址：http://www.miaoqiyuan.cn/p/lunar
	源代码：http://www.miaoqiyuan.cn/products/lunar/lunar.js
	压缩版：http://www.miaoqiyuan.cn/products/lunar/lunar.min.js
*/
var lunar = {
	data : [
		/*
			二进制形式
			xxxx	xxxx	xxxx	xxxx	xxxx
			20-17	16-12	12-9	8-5		4-1
			
			1-4: 表示当年有无闰年，有的话，为闰月的月份，没有的话，为0。
			5-16：为除了闰月外的正常月份是大月还是小月，1为30天，0为29天。
			注意：从1月到12月对应的是第16位到第5位。
			17-20： 表示闰月是大月还是小月，仅当存在闰月的情况下有意义。
			
			举个例子：
			
			以我的生日1987年威力，1987年的数据是： 0x0af46
			二进制：0000 1010 1111 0100 0110
					
					从1月到12月的天数依次为：
					5-16位 1  0  1  0  1  1  1  1  0  1  0  0
					每月日数  30 29 30 29 30 30 30 30 29 30 29 29
					对应月份  1  2  3  4  5  6  7  8  9  10 11 12
					
					0110 (1-4位) 表示1987年有闰月，闰六月
					0000 (17-20位) 存在闰月，本字段有效，表示闰小月 29天
					
					补充闰月后的每月日期
					每月日数  30 29 30 29 30 30 29 30 30 29 30 29 29
					对应月份  1  2  3  4  5  6  闰 7  8  9  10 11 12
					
		*/
		0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, //1900-1909
		0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, //1910-1919
		0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, //1920-1929
		0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, //1930-1939
		0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, //1940-1949
		0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
		0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
		0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
		0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
		0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
		0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
		0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
		0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
		0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
		0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
		0x14b63	//2050
	],
	
	//获取农历年份信息
	getData : function(year){
		return this.data[year - 1900];
	},
	
	//返回闰月是哪个月，没有闰月返回0
	getLeapMonth : function(year, lunarData){
		lunarData = lunarData || this.getData(year);	//如果传入lunarData，为了提高性能，不再进行计算
		/*
			1-4位表示闰月，例如：0010
			lunarData	: xxxx xxxx xxxx xxxx 0010
			0xf			: 0000 0000 0000 0000 1111
			&运算		: 0000 0000 0000 0000 0010
		*/
		return lunarData & 0xf;
	},
	
	//返回闰月天数
	getLeapDays : function(year, lunarData){
		lunarData = lunarData || this.getData(year);
		if( this.getLeapMonth(year, lunarData) ){
			/*
				17-20位表示闰月是大小月，例如：0001
				lunarData	: 0000 xxxx xxxx xxxx xxxx
				0x10000		: 0001 0000 0000 0000 0000
				&运算		: 0000 0000 0000 0000 0000
			*/
			return (lunarData & 0x10000) ? 30 : 29;
		}else{
			return 0;
		}
	},
	
	//农历某年某月的天数
	getMonthDays : function(year, month, lunarData){
		lunarData = lunarData || this.getData(year);
		/*
			5-16位 表示每个月的天数
			lunarData	: xxxx 0100 0100 0100 xxxx
			0x8000		: 0000 1000 0000 0000 0000
			0x8000>>8	: 0000 0000 0001 0000 0000
			&运算		: 0000 0000 0000 0000 0000
		*/
		return (lunarData & 0x8000>>month) ? 30 : 29;
	},
	
	//农历年总天数
	getLunarDays : function(year, lunarData){
		lunarData = lunarData || this.getData(year);

		//如果存在 总天数 缓存，则返回缓存
		/*
			this.cacheLunarDays = this.cacheLunarDays || {};
			if( year in this.cacheLunarDays ){
				return this.cacheLunarDays[year];
			}
		*/
		
		var days = 348; //本年的12个月，都当作小月处理。 12 x 29 = 348
		/*
			5-16位 表示每个月的天数
			lunarData	: xxxx 0100 0100 0100 xxxx
			
			0x8000		: 0000 1000 0000 0000 0000
			&运算		: 0000 0000 0000 0000 0000
			
			0x8			: 0000 0000 0000 0000 1000
			&运算		: 0000 0000 0000 0000 0000
		*/
		for(var monthIndex = 0x8000; monthIndex > 0x8; monthIndex >>= 1){
			days += (lunarData & monthIndex) ? 1 : 0;
		}
		return days + this.getLeapDays(year, lunarData);
		/*
			this.cacheLunarDays[year] = days + this.getLeapDays(year, lunarData);
			return this.cacheLunarDays[year];
		*/
	},
	
	//传入一个日期，计算农历信息
	toLunar : function(date, _date){
		//如果传入 _date，则将农历信息添加到 _date中
		var _date = _date || {};
		
		var currentYear = 2016;	//当前年份
		var lunarData = this.getData(currentYear);	//缓存 lunarData，节省性能
		var lunarDays = this.getLunarDays(currentYear, lunarData); //农历天数
		
		/*
			daysOffset == 相差天数
			为了减少不必要的性能浪费（为什么要从1900算到今年），参考日期以2016年春节为准（2016-2-8）
		*/
		var daysOffset = (new Date(date.getFullYear(), date.getMonth(), date.getDate()) - new Date(2016, 1, 8)) / 86400000;

		//获取年数
		if( daysOffset >= lunarDays ){
			//2017年和以后
			while( daysOffset >= lunarDays ){
				daysOffset -= lunarDays;
				lunarData = this.getData(++currentYear);
				lunarDays = this.getLunarDays(currentYear, lunarData);
			}
		}else if( daysOffset < 0 ){
			//2016年前
			while( daysOffset <  0 ){
				lunarData = this.getData(--currentYear);
				lunarDays = this.getLunarDays(currentYear, lunarData);
				daysOffset += lunarDays;
			}
			daysOffset++;
		}
		_date.lunarYear = currentYear;

		//本年是否为闰月
		var leapMonth = this.getLeapMonth(currentYear, lunarData);

		//获取月数
		var currentMonth, currentMonthDays;
		for(currentMonth = 1; currentMonth < 12 ; currentMonth++ ){
			_date.isLeap = false;
			///如果有闰月
			if( leapMonth ){
				if( currentMonth > leapMonth ){
					currentMonth--;
					leapMonth = 0;
					_date.isLeap = true;
				}
			}
			currentMonthDays = this.getMonthDays(currentYear, currentMonth);
			if( daysOffset > currentMonthDays ){
				daysOffset -= currentMonthDays;
			}else{
				break;
			}
		}
		_date.lunarMonth = currentMonth;
		
		//获取日
		_date.lunarDay = daysOffset;

		return _date;
	},
	
	//返回今日信息
	today : function(){
		return this.toLunar(new Date());
	}
	
};

//如果需要模块导出
//module.exports = lunar;