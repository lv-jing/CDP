import React, { useState, useEffect } from 'react';
import './style.less'
import { Button, Col, Form, Input, Row, Select, Table, Tree, Spin, message } from "antd";
import { Link, useHistory } from "react-router-dom";
import { getLabelList, getValueList } from "api/label";
import Const from "../../utils/Const";
import { getTreeData } from 'utils/Tree';
import qs from 'querystring';
import moment from 'moment';
import Data from 'pages/system/data';

const { Search } = Input;

export default function LableList(props) {
    const [loading, setLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [list, setList] = useState([]);
    const [pagination, setPagintion] = useState({
        current: 1,
        pageNum: 1,
        pageSize: 10
    });
    const [allData, setAllData] = useState([])
    const [root, setRoot] = useState({})
    const [selectParent, setSelectParent] = useState({})
    const [labelStatistics, setLabelStatistics] = useState({})
    const [treeData, setTreeData] = useState([])
    const [defaultKey, setDefaultKey] = useState() //默认选中的节点
    const [defalutParentKey, setDefalutParentKey] = useState('') //默认展开节点
    const [yesterday] = useState(moment(new Date()).add(-1, 'd').format('YYYY-MM-DD'))

    const columns = [
        {
            title: '标签值',
            dataIndex: 'labelName',
        },
        {
            title: '消费者人数',
            dataIndex: 'useageNums',
        },
        {
            title: '占比',
            dataIndex: 'proportion',
            render: (text) => (
                `${(text * 100).toFixed(2)}%`
            )
        }
    ]
    const history = useHistory();

    useEffect(() => {
        setLoading(true)
        let queryId = qs.parse(props.history.location.search
            && props.history.location.search.replace('?', ''))?.id
        getLabelList().then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                setAllData(res.rows)
                let hasChildrenNodes = res.rows.filter(x => x.hasChildren === '1')
                let normalData = hasChildrenNodes.map(x => {
                    let child = {
                        id: x.id,
                        parentId: x.parentId,
                        title: x.labelName,
                        key: x.id,
                        sort: x.sort,
                        sqlCode: x.sqlCode,
                        labelType: x.labelType
                    }
                    child.parentName = res.rows.find(p => p.id === x.parentId)?.labelName
                    return child
                })
                localStorage.setItem('lable-top-parent', JSON.stringify(normalData.filter(x => !x.parentId).sort((x1, x2) => x1.sort - x2.sort)))
                if (!queryId) {
                    let allParent = normalData.filter(x => !x.parentId).sort((x1, x2) => x1.sort - x2.sort)
                    let firstParent = allParent[0]
                    setDefalutParentKey(firstParent.id) //设置展开的节点

                    let firstChildren = normalData.filter(x => x.parentId === firstParent.id).sort((x1, x2) => x1.sort - x2.sort)
                    let defaultChild = firstChildren[0]
                    setParentRoot(res.rows, defaultChild) //父节点数据
                    getTableList(defaultChild) // 列表数据
                    setDefaultKey(defaultChild.id) //设置选中的节点
                } else {
                    let defaultChild = normalData.find(x => x.id === queryId)
                    setDefaultKey(queryId)  //设置选中的节点
                    setParentRoot(res.rows, defaultChild) //父节点数据
                    getTableList(defaultChild) // 列表数据
                    setDefalutParentKey(defaultChild?.parentId) //设置展开的节点
                }
                let treeList = getTreeData(normalData)
                setTreeData(treeList)
                setLoading(false)
            }
        })
    }, [props.history.location.search])

    function onSearch(value) {
        let normalData = allData.filter(x => x.hasChildren === '1').map(x => {
            return {
                id: x.id,
                parentId: x.parentId,
                title: x.labelName,
                key: x.id,
                sort: x.sort,
                sqlCode: x.sqlCode,
                labelType: x.labelType
            }
        })
        if (!value) {
            let treeList = getTreeData(normalData)
            setTreeData(treeList)
            return
        }
        let newTreeData = []
        normalData.map(item => {
            if (item.title.indexOf(value) > -1) {
                if (!newTreeData.map(x => x.id).includes(item.id)) {
                    newTreeData.push(item)
                } //搜索的节点直接放入新的数组
                if (item.parentId) { //如果搜索的节点有父节点
                    if (!newTreeData.map(x => x.id).includes(item.parentId)) {
                         //把该父节点下所有不重复的子字节点放入新数组
                        newTreeData.push(...normalData.filter(x => x.id === item.parentId))
                    } 
                } else { //如果搜索的节没有父节点
                    if (!newTreeData.map(x => x.parentId).includes(item.id)) {
                         //把父节点等于该节点下的所有不重复的子节点放入新数组
                        newTreeData.push(...normalData.filter(x => x.parentId === item.id))
                    } 
                }
            }
        })
        let searchTreeData = getTreeData(newTreeData)
        setTreeData(searchTreeData)
    }
    const handleChange = (tablePagination) => {
        setPagintion({ ...tablePagination, pageNum: tablePagination.current - 1 });
    }
    const onSelect = (selectedKeys, e) => {
        const { node } = e
        if (node.children) {
            setDefalutParentKey(defalutParentKey === node.id ? '' : node.id)
        } else {
            setPagintion({
                current: 1,
                pageNum: 1,
                pageSize: 10
            });
            setDefaultKey(node.id)
            setParentRoot(allData, node)
            getTableList(node)
        }
    }

    const setParentRoot = (data, node) => {
        let selectData = data.find(x => x.id === node.id)
        let rootData = data.find(x => x.id === node.parentId)

        setSelectParent(selectData || {})
        setRoot(rootData)
    }

    const getTableList = (node) => {
        setTableLoading(true)
        getValueList({
            labelId: node.id,
            parentLabelName: node.parentName,
            lableCnName: node.title,
            sqlCode: node.sqlCode
        }).then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                setList(res.data.childLabelStatistics)
                setLabelStatistics(res.data.labelStatistics)
                setTableLoading(false)
            }
        }).catch(error => {
            setTableLoading(false)
        })
    }
    return (
        <>
            <Spin spinning={loading}>
                <div className='content-container m-20' id="label">
                    <div className="p-20">
                        <div className="mb-20"><b>标签管理</b></div>
                        <Row gutter={24}>
                            <Col span={4}>
                                <Search allowClear style={{ marginBottom: 8 }} placeholder="名称" onSearch={onSearch} />
                                <Tree
                                    treeData={treeData}
                                    defaultExpandAll
                                    selectedKeys={[defaultKey]}
                                    expandedKeys={[defalutParentKey]}
                                    onSelect={onSelect}
                                    onExpand={onSelect}
                                />
                            </Col>
                            <Col span={20}>
                                {root.labelName !== '价值标签' ?
                                    <Row>
                                        <Col span={12} className="text-left">
                                            <Form.Item >
                                                <Button className="black" onClick={() => history.push(`/label/create`)}>
                                                    新建标签
                                                </Button>
                                            </Form.Item>
                                        </Col> <Col span={12} className="text-right"> <Form.Item >数据更新截止 {yesterday}</Form.Item></Col>
                                    </Row> : <Row><Col span={24} className="text-right"><Form.Item >数据更新截止 {yesterday}</Form.Item></Col></Row>}
                                <div className="content-header p-20 label-header" style={{ borderBottom: 'none' }}>
                                    <Form name="control-ref">
                                        <Row gutter={24}>
                                            <Col span={5}>
                                                <Form.Item labelCol={5} name="typeCode" label='标签ID'>
                                                    <span>{selectParent.labelCode}</span>
                                                </Form.Item>
                                            </Col>
                                            <Col span={10}>
                                                <Form.Item labelCol={5} name="typeCode" label='标签名'>
                                                    <span>{selectParent.labelName}</span>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={24}>
                                            <Col span={5}>
                                                <Form.Item labelCol={5} name="typeCode" label='消费者人数'>
                                                    <span>{labelStatistics?.useageNums}</span>
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item labelCol={5} name="typeCode" label='使用次数'>
                                                    <span>{labelStatistics?.useageTimes}</span>
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item labelCol={5} name="typeCode" label='使用率'>
                                                    <span>{((labelStatistics?.proportion ?? 0) * 100).toFixed(2)}%</span>
                                                </Form.Item>
                                            </Col>
                                            <Col span={9} className="text-right">
                                                {selectParent.labelType === '1' || root.labelName === '价值标签' ?
                                                    <Button className="black" onClick={() => history.push(`/label/edit/${selectParent.id}`,
                                                        { root: root, selectParent: selectParent })}>
                                                        编辑标签
                                                    </Button> : null}
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>

                                <div className="one-table" style={{ padding: 0, marginTop: 10 }}>
                                    <Table dataSource={list} loading={tableLoading} columns={columns} pagination={pagination} rowKey="id"
                                        onChange={handleChange} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Spin>
        </>
    );
}
