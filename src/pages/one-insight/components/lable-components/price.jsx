import React, { useState, useEffect } from 'react';

export default function Price(props) {
    const [level, setLevel] = useState('')
    useEffect(() => {
        let tempData = props.data.find(x=>x.subClassification === '45')
        if(!tempData || !tempData.portraitValue) {
            return
        }
        let point = parseFloat(tempData.portraitValue)
        if (point > 0 && point <= 60) {
            setLevel('low-temp')
        }
        if (point > 60 && point <= 80) {
            setLevel('middle-temp')
        }
        if (point > 80 && point <= 100) {
            setLevel('high-temp')
        }
    }, [props.data])
    return (
        <div className="price bg-white p-20-40">
            <div className="title text-center">营销活动信息-价格敏感度</div>
            <div className={`thermometer-panel ${level}`}>
                <div className="price-du">价格敏感度：{level === 'high-temp' ? '高' : level === 'middle-temp' ? '中' : '低'}</div>
                <div className="kedu" style={{ bottom: '75%' }}>100—</div>
                <div className="kedu" style={{ bottom: '60%', right: '12%' }}>80</div>
                <div className="kedu" style={{ bottom: '45%', right: '12%' }}>60</div>
                <div className="kedu" style={{ bottom: '30%', right: '12%' }}>40</div>
                <div className="kedu" style={{ bottom: '15%', right: '12%' }}>20</div>
                <div className="thermometer tem-color"></div>
                <div className="thermometer-water tem-water-color"></div>
            </div>
        </div>
    )
}