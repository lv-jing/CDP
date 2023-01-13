import React, { useState, useEffect } from 'react';
import '../style.less'
import {
    Cascader,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    DatePicker,
    Radio,
    Button,
    Select,
    message,
    Popconfirm,
    Spin
} from "antd";
import {
    getParams,
    getParamsTwo,
    setInitvalue,
    setData,
    setlabelInfo,
    initialValue,
    getParamsThree,
    setInitvalueTwo,
    setInitvalueThree
} from "./rules";
import { createLabel, getDetail, editLabel, deleteLabel } from "../../../api/label";
import Const from "../../../utils/Const";
import ModleForm from './modleForm'
import ModleGroup from "./modleGroup";
import { useHistory } from "react-router-dom";

const { Option } = Select;
const { RangePicker } = DatePicker;


const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};

export default function LableCreate(props) {
    //showNameCode是数据库数据
    const [id] = useState(props.id)
    const [form] = Form.useForm()
    const [initialValues, setInitialValues] = useState({})
    const [list, setList] = useState(['远', '中', '近'])
    const [listValue, setListValue] = useState('远')
    const [dataSource, setDataSource] = useState(setData())
    const history = useHistory();
    useEffect(() => {
        if (id) {
            props.loadingSet(true)
            getDetailData()
        }

        async function getDetailData() {
            try {
                const { code, data } = await getDetail(id)
                if (code && code === Const.SUCCESS_CODE) {
                    let obj = {}
                    let showNameCode = data.labelInfo.showNameCode.split(',')
                    if (data.ruleList.length === 0) {
                        obj = initialValue(data)
                        onChange(showNameCode)
                    } else {
                        if (showNameCode[0] === 'RMF') {
                            if (showNameCode[1] === 'R') { // R得情况
                                obj = setInitvalue(data)
                            } else {
                                obj = setInitvalueTwo(data)
                                setList(['高', '中', '低'])
                                setListValue('高')
                            }
                        } else {
                            obj = setInitvalueThree(data)
                            setDataSource(setData(data.ruleList));
                        }
                    }
                    setInitialValues({ ...obj })
                    form.setFieldsValue(obj);
                    props.loadingSet(false)
                }
            } catch (err) {
                console.log(err)
                props.loadingSet(false)
            }
        }

    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [form, id]
    )

    const onFinish = (values) => {
        if (id) {
            // RMF修改
            values.showNameCode = initialValues.showNameCode
            if (values.showNameCode[0] === 'RMF') {
                if (values.showNameCode[1] === 'R') { // R得情况
                    edit({ ...getParams(values, id), "editFlag": "1" })
                } else {
                    edit({ ...getParamsTwo(values, id), "editFlag": "1" }) // MF得情况
                }
            } else {
                if (dataSource[0].max && dataSource[1].max) {
                    if (dataSource[1].max > dataSource[0].max) {
                        edit({ ...getParamsThree(values, dataSource, id), "editFlag": "1" });
                    } else {
                        message.error('中价值输入的值必须大于高价值输入的值')
                    }
                } else {
                    message.error('区间值请填写完整')
                }
            }
        } else {
            // RMF新增
            if (values.showNameCode[0] === 'RMF') {
                if (values.showNameCode[1] === 'R') { // R得情况
                    setAdd(getParams(values))
                } else {
                    setAdd(getParamsTwo(values)) // MF得情况
                }
            } else {
                if (dataSource[0].max && dataSource[1].max) {
                    if (dataSource[1].max > dataSource[0].max) {
                        setAdd(getParamsThree(values, dataSource));
                    } else {
                        message.error('中价值输入的值必须大于高价值输入的值')
                    }
                } else {
                    message.error('区间值请填写完整')
                }
            }
        }
    };

    function setAdd(params) {
        props.loadingSet(true)
        createLabel(params).then(res => {
            if (res.code === 200) {
                props.loadingSet(false)
                message.success('创建成功')
                history.push('/label/list')
            }
        })
    }

    function edit(params) {
        props.loadingSet(true)
        editLabel(params).then(res => {
            if (res.code === 200) {
                props.loadingSet(false)
                message.success('编辑成功')
                history.push('/label/list')
            }
        })
    }

    function callback(e) {
        setListValue(e.target.value)
    }
    /**
     * 删除
     */
    function handleDelete() {
        props.loadingSet(true)
        deleteLabel(id).then(res => {
            if (res.code === 200) {
                props.loadingSet(false)
                message.success('删除成功')
                history.push('/label/list')
            }
        })
    }

    function onChange(value) {
        setInitialValues({ ...initialValues, showNameCode: value })
        form.setFieldsValue({ ...initialValues, showNameCode: value })
        if (value[1] === 'R') {
            setList(['远', '中', '近'])
            setListValue('远')
        } else {
            setList(['高', '中', '低'])
            setListValue('高')
        }
    }

    function dataSourceChange(e, index) {
        let list = dataSource
        let value = e.target.value
        console.log(value);
        if (value < 0 || value > 100) return;
        list[index].max = value
        list[index + 1].min = value
        setDataSource([...list])
    }

    return (
        <div className="lable-list">
            <Form form={form} initialValues={initialValues} {...layout} name="control-ref" onFinish={onFinish}
            >
                <div className="content-container m-20">
                    <div className='content-header p-10-20'>
                        <Row>
                            <Col md={12}>规则创建-基础信息</Col>
                        </Row>
                    </div>
                    <div className="p-40">
                        <Row gutter={24}>
                            <Col span="8">
                                <Col span="24">
                                    <Form.Item
                                        label="标签ID"
                                        name="labelCode"
                                        rules={[{ required: true, message: '请输入标签名称' }]}
                                    >
                                        <Input size={'large'} disabled/>
                                    </Form.Item>
                                </Col>
                                <Col span="24">
                                    <Form.Item
                                        label="标签名"
                                        name="labelName"
                                        rules={[{ required: true, message: '请选择标签显示名' }]}
                                    >
                                        {/* <Cascader size={'large'} displayRender={displayRender} options={options}
                                            onChange={onChange} disabled={id} /> */}
                                            <Input size={'large'}/>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="typeCode"
                                        label='标签类型'
                                        rules={[{ required: true, message: '请选择标所属类型' }]}
                                    >
                                        <Input size={'large'} disabled/>
                                    </Form.Item>
                                </Col>
                                <Col span="24" style={{ display: 'none' }}>
                                    <Form.Item
                                        label="标签名称："
                                        name="showName"
                                    >
                                        <Input size={'large'} />
                                    </Form.Item>
                                </Col>
                                <Col span="24">
                                    <Form.Item
                                        label="更新方式："
                                        name="updateMode"
                                        rules={[{ required: true, message: '请输入分群显示名' }]}
                                    >
                                        <Radio.Group size={'large'} buttonStyle="solid"
                                            style={{ width: "100%" }}>
                                            <Radio.Button value="例行"
                                                style={{
                                                    width: "50%",
                                                    textAlign: "center"
                                                }}>例行</Radio.Button>
                                            <Radio.Button value="手动"
                                                style={{
                                                    width: "50%",
                                                    textAlign: "center"
                                                }}>手动</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    label="备注："
                                    name="remark"
                                    labelCol={{ span: 1 }}
                                    wrapperCol={{ span: 22 }}
                                >
                                    <Input.TextArea rows={7} className="w-100"></Input.TextArea>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="content-container m-20">
                    <div className='content-header p-10-20'>
                        <Row>
                            <Col md={12}>规则创建-标签规则</Col>
                        </Row>
                    </div>
                    <div className="p-40">
                        {
                          initialValues.showNameCode &&  initialValues.showNameCode[0] &&
                            <>
                                {
                                    initialValues.showNameCode[0] === 'RMF' ?
                                        <>
                                            <div className="mb-20">系统会按照以下自定义分层的顺序进行用户匹配</div>
                                            <Row span={24}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label=""
                                                        labelCol={0}
                                                        wrapperCol={24}
                                                    >
                                                        <Radio.Group value={listValue} size={'large'}
                                                            buttonStyle="solid"
                                                            style={{ width: "100%" }} onChange={callback}>
                                                            {
                                                                list.map((item, index) => {
                                                                    return (
                                                                        <Radio.Button value={item} key={index}
                                                                            style={{
                                                                                width: "33.3%",
                                                                                textAlign: "center"
                                                                            }}>{item}</Radio.Button>
                                                                    )
                                                                })
                                                            }
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row span={24}>
                                                <Col span={8}>
                                                    {
                                                        initialValues.showNameCode[1] !== 'R' ?
                                                            <Form.Item
                                                                label="满足："
                                                                name="time"
                                                                rules={[{ required: true, message: '请选择时间' }]}
                                                            >
                                                                <RangePicker className="w-100"
                                                                    format='YYYY-MM-DD'
                                                                    allowClear={false}
                                                                />
                                                            </Form.Item> :
                                                            <Row gutter={20}>
                                                                <Col span={11}>
                                                                    <Form.Item
                                                                        label="满足："
                                                                        labelCol={{ span: 12 }}
                                                                    >
                                                                        <Input className="text-center" disabled
                                                                            value="购买次数" />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={5}>
                                                                    <Form.Item
                                                                        name="status"
                                                                        labelCol={{ span: 0 }}
                                                                        wrapperCol={24}
                                                                    >
                                                                        <Select className="w-100">
                                                                            <Option value="≥">≥</Option>
                                                                            <Option value="≤">≤</Option>
                                                                        </Select>
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={7}>
                                                                    <Form.Item
                                                                        name="number"
                                                                        labelCol={0}
                                                                        wrapperCol={24}
                                                                        rules={[{ required: true, message: '请输入次数' }]}
                                                                    >
                                                                        <InputNumber className="w-100" min={1}
                                                                            placeholder="请输入次数" />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={1}>次</Col>
                                                            </Row>

                                                    }
                                                </Col>
                                            </Row>
                                            <ModleForm listValue={listValue} initialValues={initialValues} />
                                        </> :
                                        <>
                                            <div className="mb-20">用户群规则满足</div>
                                            <ModleGroup valueGroup={initialValues} dataSource={dataSource}
                                                dataSourceChange={dataSourceChange} />
                                        </>
                                }
                            </>
                        }
                        <Row span={24}>
                            <Col span="24" className="text-center">
                                {/* {
                                    id ?
                                        <Popconfirm
                                            title="确认删除此标签？"
                                            onConfirm={handleDelete}
                                        >
                                            <Button htmlType="button" type="danger"
                                                className="create-but mr-20">删除</Button>
                                        </Popconfirm>
                                        : null
                                } */}
                                <Button htmlType="submit" type="primary"
                                    className="create-but">{id ? '保存' : '创建'}</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Form>
        </div>
    );
}
