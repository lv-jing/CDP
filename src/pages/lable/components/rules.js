import moment from 'moment'

export function getParams(values, id) {
    return {
        labelInfo: {
            id,
            labelType: 1,
            typeCode: values.typeCode,
            showNameCode: values.showNameCode.toLocaleString(),
            showName: values.showName,
            labelName: values.labelName,
            updateMode: values.updateMode,
            remark: values.remark
        },
        rules: [
            {
                "remark": values.remark1,
                "labelType": '远',
                "conditionField": "buy_times_interval",
                "conditionContext": values.status, // 大小
                "conditionRange": values.number,// 数量
                "ruleTimeStart": moment(values.time1[0]).format('YYYY-MM-DD HH:mm:ss'), // 开始时间
                "ruleTimeEnd": moment(values.time1[1]).format('YYYY-MM-DD HH:mm:ss'), // 结束时间
                "sortNum": 1
            },
            {
                "remark": values.remark2,
                "labelType": '中',
                "conditionField": "buy_times_interval",
                "conditionContext": values.status, // 大小
                "conditionRange": values.number,// 数量
                "ruleTimeStart": moment(values.time2[0]).format('YYYY-MM-DD HH:mm:ss'), // 开始时间
                "ruleTimeEnd": moment(values.time2[1]).format('YYYY-MM-DD HH:mm:ss'), // 结束时间
                "sortNum": 2
            },
            {
                "remark": values.remark3,
                "labelType": '近',
                "conditionField": "buy_times_interval",
                "conditionContext": values.status, // 大小
                "conditionRange": values.number,// 数量
                "ruleTimeStart": moment(values.time3[0]).format('YYYY-MM-DD HH:mm:ss'), // 开始时间
                "ruleTimeEnd": moment(values.time3[1]).format('YYYY-MM-DD HH:mm:ss'), // 结束时间
                "sortNum": 3
            },
        ]
    }
}

export function setInitvalue(data) {
    return {
        labelCode: data.labelInfo.labelCode,
        typeCode: data.labelInfo.typeCode,
        showNameCode: data.labelInfo.showNameCode.split(','),
        showName: data.labelInfo.showName,
        labelName: data.labelInfo.labelName,
        updateMode: data.labelInfo.updateMode,
        remark: data.labelInfo.remark,
        listValue:  data.ruleList[0].labelType,
        number: data.ruleList[0].conditionRange,
        number1: '1',
        number2: '1',
        number3: '1',
        number4: '1',
        groupStatus: "≥",
        status: data.ruleList[0].conditionContext,
        status1: '≥',
        status2: '≥',
        status3: '≥',
        status4: '≤',
        time: [moment(moment().format("YYYY-MM-DD")), moment(moment().subtract(1, "years").format("YYYY-MM-DD"))],
        time1: [moment(data.ruleList[0].ruleTimeStart), moment(data.ruleList[0].ruleTimeEnd)],
        time2: [moment(data.ruleList[1].ruleTimeStart), moment(data.ruleList[1].ruleTimeEnd)],
        time3: [moment(data.ruleList[2].ruleTimeStart), moment(data.ruleList[2].ruleTimeEnd)],
        remark1: data.ruleList[0].remark,
        remark2: data.ruleList[1].remark,
        remark3: data.ruleList[2].remark,
        groupTime: [moment(moment().format("YYYY-MM-DD")), moment(moment().subtract(1, "years").format("YYYY-MM-DD"))]
    }
}

export function getParamsTwo(values, id) {
    let name = values.showNameCode[1] === 'M' ? '实际支付金额' : '购买次数'
    return {
        labelInfo: {
            id,
            typeCode: values.typeCode,
            labelType: 1,
            showNameCode: values.showNameCode.toLocaleString(),
            showName: values.showName,
            labelName: values.labelName,
            updateMode: values.updateMode,
            remark: values.remark
        },
        rules: [
            {
                "remark": values.remark1,
                "labelType": '高',
                "conditionField": name,
                "conditionContext": values.status1, // 大小
                "conditionRange": values.number1,// 数量
                "ruleTimeStart": moment(values.time[0]).format('YYYY-MM-DD HH:mm:ss'), // 开始时间
                "ruleTimeEnd": moment(values.time[1]).format('YYYY-MM-DD HH:mm:ss'), // 结束时间
                "sortNum": 1
            },
            {
                "remark": values.remark2,
                "labelType": '中',
                "conditionField": name,
                "conditionContext": values.status2, // 大小
                "conditionRange": values.number2,// 数量
                "ruleTimeStart": moment(values.time[0]).format('YYYY-MM-DD HH:mm:ss'), // 开始时间
                "ruleTimeEnd": moment(values.time[1]).format('YYYY-MM-DD HH:mm:ss'), // 结束时间
                "sortNum": 2
            },
            {
                "remark": values.remark2,
                "labelType": '中',
                "conditionField": name,
                "conditionContext": values.status4, // 大小
                "conditionRange": values.number4,// 数量
                "ruleTimeStart": moment(values.time[0]).format('YYYY-MM-DD HH:mm:ss'), // 开始时间
                "ruleTimeEnd": moment(values.time[1]).format('YYYY-MM-DD HH:mm:ss'), // 结束时间
                "sortNum": 3
            },
            {
                "remark": values.remark3,
                "labelType": '低',
                "conditionField": name,
                "conditionContext": values.status3, // 大小
                "conditionRange": values.number3,// 数量
                "ruleTimeStart": moment(values.time[0]).format('YYYY-MM-DD HH:mm:ss'), // 开始时间
                "ruleTimeEnd": moment(values.time[1]).format('YYYY-MM-DD HH:mm:ss'), // 结束时间
                "sortNum": 4
            },
        ]
    }
}

export function setInitvalueTwo(data) {
    return {
        labelCode: data.labelInfo.labelCode,
        typeCode: data.labelInfo.typeCode,
        showNameCode: data.labelInfo.showNameCode.split(','),
        showName: data.labelInfo.showName,
        labelName: data.labelInfo.labelName,
        updateMode: data.labelInfo.updateMode,
        remark: data.labelInfo.remark,
        listValue: data.ruleList[0].labelType,
        groupNumber: 1,
        number: 1,
        number1: data.ruleList[0].conditionRange,
        number2: data.ruleList[1].conditionRange,
        number3: data.ruleList[3].conditionRange,
        number4: data.ruleList[2].conditionRange,
        groupStatus: "≥",
        status: "≥",
        status1: data.ruleList[0].conditionContext,
        status2: data.ruleList[1].conditionContext,
        status3: data.ruleList[3].conditionContext,
        status4: data.ruleList[2].conditionContext,
        time: [moment(data.ruleList[0].ruleTimeStart), moment(data.ruleList[0].ruleTimeEnd)],
        time1: [moment(moment().format("YYYY-MM-DD")), moment(moment().subtract(1, "years").format("YYYY-MM-DD"))],
        time2: [moment(moment().format("YYYY-MM-DD")), moment(moment().subtract(1, "years").format("YYYY-MM-DD"))],
        time3: [moment(moment().format("YYYY-MM-DD")), moment(moment().subtract(1, "years").format("YYYY-MM-DD"))],
        remark1: data.ruleList[0].remark,
        remark2: data.ruleList[1].remark,
        remark3: data.ruleList[3].remark,
        groupTime: [moment(moment().format("YYYY-MM-DD")), moment(moment().subtract(1, "years").format("YYYY-MM-DD"))],
    }
}

export function getParamsThree(values, list, id) {
    return {
        labelInfo: {
            id,
            typeCode: values.typeCode,
            labelType: 1,
            showNameCode: values.showNameCode.toLocaleString(),
            showName: values.showName,
            labelName: values.labelName,
            updateMode: values.updateMode,
            remark: values.remark
        },
        rules: [
            {
                "conditionField": 'buy_amount',
                "conditionContext": values.groupStatus, // 大小
                "conditionRange": values.groupNumber,// 数量
                "ruleTimeStart": moment(values.groupTime[0]).format('YYYY-MM-DD HH:mm:ss'), // 开始时间
                "ruleTimeEnd": moment(values.groupTime[1]).format('YYYY-MM-DD HH:mm:ss'), // 结束时间
                "sortNum": 1
            },
            {
                "conditionField": 'rate_interval',
                "conditionContext": '', // 大小
                "conditionRange": list[0].max,// 数量
                "ruleTimeStart": moment(values.groupTime[0]).format('YYYY-MM-DD HH:mm:ss'), // 开始时间
                "ruleTimeEnd": moment(values.groupTime[1]).format('YYYY-MM-DD HH:mm:ss'), // 结束时间
                "sortNum": 2
            },
            {
                "conditionField": 'rate_interval',
                "conditionContext": '', // 大小
                "conditionRange": list[1].max,// 数量
                "ruleTimeStart": moment(values.groupTime[0]).format('YYYY-MM-DD HH:mm:ss'), // 开始时间
                "ruleTimeEnd": moment(values.groupTime[1]).format('YYYY-MM-DD HH:mm:ss'), // 结束时间
                "sortNum": 3
            },
        ]
    }
}

export function setInitvalueThree(data) {
    return {
        labelCode: data.labelInfo.labelCode,
        typeCode: data.labelInfo.typeCode,
        showNameCode: data.labelInfo.showNameCode.split(','),
        showName: data.labelInfo.showName,
        labelName: data.labelInfo.labelName,
        updateMode: data.labelInfo.updateMode,
        remark: data.labelInfo.remark,
        listValue: data.ruleList[0].labelType,
        groupNumber: data.ruleList[0].conditionRange,
        number: 1,
        number1: 1,
        number2: 1,
        number3: 1,
        number4: 1,
        groupStatus: data.ruleList[0].conditionContext,
        status: "≥",
        status1: "≥",
        status2: "≥",
        status3: "≥",
        status4: "≤",
        time: [moment(moment().format("YYYY-MM-DD")), moment(moment().subtract(1, "years").format("YYYY-MM-DD"))],
        time1: [moment(moment().format("YYYY-MM-DD")), moment(moment().subtract(1, "years").format("YYYY-MM-DD"))],
        time2: [moment(moment().format("YYYY-MM-DD")), moment(moment().subtract(1, "years").format("YYYY-MM-DD"))],
        time3: [moment(moment().format("YYYY-MM-DD")), moment(moment().subtract(1, "years").format("YYYY-MM-DD"))],
        remark1: '',
        remark2: '',
        remark3: '',
        groupTime: [moment(data.ruleList[0].ruleTimeStart), moment(data.ruleList[0].ruleTimeEnd)],
    }
}


export function setData(data) {
    return [
        {
            id: 1,
            name: '高价值',
            min: 0,
            max: data ? data[1].conditionRange : ''
        }, {
            id: 2,
            name: '中价值',
            min: data ? data[1].conditionRange : '',
            max: data ? data[2].conditionRange : ''
        }, {
            id: 3,
            name: '低价值',
            min: data ? data[2].conditionRange : '',
            max: 100
        }
    ]
}

export function initialValue(data) {
    return {
        labelCode: data.labelInfo.labelCode,
        typeCode: data.labelInfo.typeCode,
        showNameCode: data.labelInfo.showNameCode.split(','),
        showName: data.labelInfo.showName,
        labelName: data.labelInfo.labelName,
        updateMode: data.labelInfo.updateMode ? data.labelInfo.updateMode : '例行',
        remark: data.labelInfo.remark,
        listValue: '',
        groupNumber: 1,
        number: 1,
        number1: 1,
        number2: 1,
        number3: 1,
        number4: 1,
        groupStatus: "≥",
        status: "≥",
        status1: "≥",
        status2: "≥",
        status3: "≥",
        status4: "≤",
        time: [moment(moment().format("YYYY-MM-DD")), moment(moment().subtract(1, "years").format("YYYY-MM-DD"))],
        time1: [moment(moment().format("YYYY-MM-DD")), moment(moment().subtract(1, "years").format("YYYY-MM-DD"))],
        time2: [moment(moment().format("YYYY-MM-DD")), moment(moment().subtract(1, "years").format("YYYY-MM-DD"))],
        time3: [moment(moment().format("YYYY-MM-DD")), moment(moment().subtract(1, "years").format("YYYY-MM-DD"))],
        remark1: '',
        remark2: '',
        remark3: '',
        groupTime: [moment(moment().format("YYYY-MM-DD")), moment(moment().subtract(1, "years").format("YYYY-MM-DD"))],
    }
}