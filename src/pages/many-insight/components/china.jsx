import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import chinaJson from '../json/china.json'

const China = (props) => {
    function randomData() {  
        return Math.round(Math.random()*500);  
   }
    useEffect(() => {
        let chinaData = props.data.filter(x => x.subClassification === '13')
        let dataList = chinaData.map(item => {
            return { value: item.portraitValue, name: item.portraitKey }
        })
        var chinaDom = document.getElementById('china');
        var chinaChart = echarts.init(chinaDom);
        echarts.registerMap('China', chinaJson);
        var mydata = [
            { name: '北京市', value: randomData() },
            { name: '天津市', value: randomData() },
            { name: '上海市', value: randomData() },
            { name: '重庆市', value: randomData() },
            { name: '河北省', value: randomData() },
            { name: '河南省', value: randomData() },
            { name: '云南省', value: randomData() },
            { name: '辽宁省', value: randomData() },
            { name: '黑龙江省', value: randomData() },
            { name: '湖南省', value: randomData() },
            { name: '安徽省', value: randomData() },
            { name: '山东省', value: randomData() },
            { name: '新疆维吾尔自治区', value: randomData() },
            { name: '江苏省', value: randomData() },
            { name: '浙江省', value: randomData() },
            { name: '江西省', value: randomData() },
            { name: '湖北省', value: randomData() },
            { name: '广西壮族自治区', value: randomData() },
            { name: '甘肃省', value: randomData() },
            { name: '山西省', value: randomData() },
            { name: '内蒙古自治区', value: randomData() },
            { name: '陕西省', value: randomData() },
            { name: '吉林省', value: randomData() },
            { name: '福建省', value: randomData() },
            { name: '贵州省', value: randomData() },
            { name: '广东省', value: randomData() },
            { name: '青海省', value: randomData() },
            { name: '西藏自治区', value: randomData() },
            { name: '四川省', value: randomData() },
            { name: '宁夏回族自治区', value: randomData() },
            { name: '海南省', value: randomData() },
            { name: '台湾省', value: randomData() },
            { name: '香港', value: randomData() },
            { name: '澳门', value: randomData() }
        ]
        var option = {
            backgroundColor: '#FFFFFF',
            tooltip: {
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.2,
                formatter: function (params) {
                    return '客群人数: ' + params.value;
                }
            },
            visualMap: {
                left: 'left',
                top: 'top',
                min: 0,
                max: 1000,
                inRange: {
                    color: [
                        '#FAAE72',
                        '#FFB564',
                        '#FFC79B',
                        '#FFCF6F',
                        '#FFFB84'
                    ]
                },
                text: ['High', 'Low'],
                calculable: true
            },
            series: [{
                type: 'map',
                center: [90, 30],
                mapType: 'China',
                roam: true,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                data: mydata
            }]
        }
        chinaChart.setOption(option);
    }, [props.data])
    return (
        <div className="bg-white p-20-40">
            <div className="title">{props.title}-省份分布</div>
            <div id="china" className="top4-chart"></div>
        </div>
    )
}

export default China