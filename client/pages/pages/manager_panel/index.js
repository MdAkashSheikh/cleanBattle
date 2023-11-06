import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { CustomerInformationService } from '../../../demo/service/CustomerInformationService';
import { PriorityGroupService } from '../../../demo/service/PriorityGroupService';
import { PotentialCustomerService } from '../../../demo/service/PotentialCustomerService';

const Manager_Panel = () => {
    let managerInfo = {
        id: 0,
        follows: [{id: 0, aid: 0, add1: '', priority: '', potential: '', followDate: '', ptime: '', feedback: ''}]
    };

    const dataArr = [];
    const [managerDatas, setManagerDatas] = useState(null);
    const [dataDialog, setDataDialog] = useState(false);
    const [deleteDataDialog, setDeleteDataDialog] = useState(false);
    const [managerData, setManagerData] = useState(managerInfo);
    const [selectedDatas, setSelectedDatas] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [msPriority, setMsPriority] = useState(null);
    const [msPotential, setMsPotential] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [toggleRefresh, setTogleRefresh] = useState(false);
    const [one, setOne] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState('');


    useEffect(() => {

        CustomerInformationService.getCustomerInfo().then((res) => setManagerDatas(res.data.AllData));
        PriorityGroupService.getPriority().then((res) => setMsPriority(res.data.AllData));
        PotentialCustomerService.getPotential().then((res) => setMsPotential(res.data.AllData)); 


    }, [toggleRefresh]);

    const openNew = () => {
        setManagerData(managerInfo);
        setSubmitted(false);
        setDataDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setDataDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteDataDialog(false);
    };


    const saveData = () => {
        setSubmitted(true);
        

        // let followsArr = [...managerData.follows]
        // console.log("PPPP1",typeof followsArr)
        dataArr.push(managerData.follows)
        console.log("PPPPPPPPPPPP", typeof dataArr)


        if( dataArr, managerData._id ) {
            CustomerInformationService.editManagerPanel(
                dataArr,
                managerData._id
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Follow is Updated', life: 3000 });
            })
        }
    };

    console.log("Manager Data", managerData);
    const editData = (managerData) => {
        setManagerData({ ...managerData });
        setDataDialog(true);
        setOne(1);
    };

    const confirmDeleteData = (managerData) => {
        setManagerData(managerData);
        setDeleteDataDialog(true);
    };

    const deleteData = () => {
        CustomerInformationService.deleteCustomerInfo(managerData._id).then(() => {
            setTogleRefresh(!toggleRefresh);
            setDeleteDataDialog(false);
            setManagerData(managerInfo);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer is Deleted', life: 3000 });
        })
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let data = { ...managerData };
        data.follows[`${name}`] = val;

        setManagerData(data);
    };

    const onSelectionChange = (e, name) => {
        let _infoData = {...managerData };
        _infoData.follows[`${name}`] = e.value;
        
        setManagerData(_infoData);
    }

    const onAddressChange = (e, prev_address) => {
        let id1 = prev_address?.filter(item => item.add == e.value)?.map(item=> item.id).toString();
        const num = Math.random().toString().slice(2);
        let _infoData = {...managerData };
        _infoData.follows['id'] = num;
        _infoData.follows['aid'] = id1;
        _infoData.follows['add1'] = e.value;
        setManagerData(_infoData);
    }


    const onDateChange = (e) => {
        let _manageData = {...managerData };
        _manageData.follows = {followDate: e.value};
        setManagerData(_manageData);
    }

    const onPtimeChange = (e, name) => {
        let _manageData = {...managerData };
        _manageData.follows[`${name}`] = e.value;
        setManagerData(_manageData);
    }

    let addressList;
    if(one == 1) {
        let m = managerData.address;
        addressList = m?.map(item => {
            return { label: item.add, value: item.add, id: item.id }
        })
        
    }

    const filteredPriority = msPriority?.filter((item) => item.is_active == '1');
    const priorityList = filteredPriority?.map(item => {
        return { label: item.name, value: item.name }
    }) 

    const filteredPotential = msPotential?.filter((item) => item.is_active == '1');
    const potentialList = filteredPotential?.map(item => {
        return { label: item.name, value: item.name };
    })
 
    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    }

    const phoneBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Phone</span>
                {rowData.phone}
            </>
        );
    }

    const emailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        );
    }
    
    const addressBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Address</span>
                {rowData.address?.map(item => <ul>{item.add}</ul>)}
            </>
        );
    }

    const zoneBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Zone</span>
                {rowData.zone}
            </>
        );
    }

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    }

    const detailsBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Details</span>
                {rowData.details}
            </>
        );
    }


    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editData(rowData)} />
                {/* <Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteData(rowData)} /> */}
            </>
        );
    };
        
    const topHeader = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <h2 className="m-0">Manager Panel</h2>
                </div>
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const dataDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveData} />
        </>
    );
    const deleteDataDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteData} />
        </>
    );

    const filteredManagerDatas = managerDatas?.filter(item => item.is_active == '1');

    if(filteredManagerDatas == null) {
        return (
            <div className="card">
                <div className="border-round border-1 surface-border p-4 surface-card">
                    <div className="flex mb-3">
                        <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                        <div>
                            <Skeleton width="10rem" className="mb-2"></Skeleton>
                            <Skeleton width="5rem" className="mb-2"></Skeleton>
                            <Skeleton height=".5rem"></Skeleton>
                        </div>
                    </div>
                    <Skeleton width="100%" height="570px"></Skeleton>
                    <div className="flex justify-content-between mt-3">
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar
                        className="mb-4"
                        left={topHeader}
                    ></Toolbar>
                    <DataTable
                        ref={dt}
                        value={filteredManagerDatas}
                        selection={selectedDatas}
                        onSelectionChange={(e) => setSelectedDatas(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} Out of {totalRecords} Category"
                        globalFilter={globalFilter}
                        emptyMessage="Manager Panel is Empty."
                        header={header}
                        responsiveLayout="scroll"
                    >

                        <Column
                            field="name"
                            header="Name"
                            sortable
                            body={nameBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        <Column
                            field="phone"
                            header="Phone"
                            body={phoneBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        <Column
                            field="email"
                            header="Email"
                            body={emailBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        <Column
                            field="address"
                            header="Address"
                            body={addressBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        <Column
                            field="zone"
                            header="Zone"
                            body={zoneBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        <Column
                            field="category"
                            header="Category"
                            body={categoryBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                         <Column
                            field="details"
                            header="Details"
                            body={detailsBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        <Column
                            header="Action"
                            body={actionBodyTemplate}
                            headerStyle={{ minWidth: "2rem" }}
                        ></Column>
                    </DataTable>

                    <Dialog
                        visible={dataDialog}
                        style={{ width: "550px" }}
                        header="Add Information"
                        modal
                        className="p-fluid"
                        footer={dataDialogFooter}
                        onHide={hideDialog}
                    >

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="managerData">Address</label>
                                <Dropdown
                                    value={managerData.follows.add1}
                                    name='address'
                                    onChange={(e) => onAddressChange(e, managerData.address)}
                                    options={addressList}
                                    optionLabel="value"
                                    showClear
                                    placeholder="Select a address"
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !managerData.follows,
                                    })}
                                />
                                {submitted && !managerData.follows && (
                                    <small className="p-invalid">
                                        follows is required.
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="managerData">Follow Up Date</label>
                                <Calendar 
                                    value={new Date(managerData.follows.followDate)}
                                    name='followDate' 
                                    onChange={(e) => onDateChange(e)} 
                                    dateFormat="dd/mm/yy" 
                                    placeholder="Select a Date"
                                    required
                                    showIcon
                                    className={classNames({
                                        "p-invalid": submitted && !managerData.follows.followDate,
                                    })}
                                />
                                {submitted && !managerData.followDate && (
                                    <small className="p-invalid">
                                        Follow Up Date is required.
                                    </small>
                                )}
                            </div>
                            <div className="field col">
                                <label htmlFor="managerData">Phone Time</label>
                                <Calendar 
                                    id="calendar-timeonly" 
                                    value={managerData.follows.ptime}
                                    onChange={(e) => onPtimeChange(e, "ptime")} 
                                    timeOnly 
                                    hourFormat="12" 
                                />
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="managerData">Priority Group</label>
                                <Dropdown
                                    value={managerData.follows.priority}
                                    name='priority'
                                    onChange={(e) => onSelectionChange(e, "priority")}
                                    options={priorityList}
                                    optionLabel="value"
                                    showClear
                                    placeholder="Select a Priority"
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !managerData.priority,
                                    })}
                                />
                                {submitted && !managerData.priority && (
                                    <small className="p-invalid">
                                        Priority is required.
                                    </small>
                                )}
                            </div>

                            <div className="field col">
                                <label htmlFor="managerData">Potential Group</label>
                                <Dropdown
                                    value={managerData.follows.potential}
                                    name='potential'
                                    onChange={(e) => onSelectionChange(e, "potential")}
                                    options={potentialList}
                                    optionLabel="value"
                                    showClear
                                    placeholder="Select a Potential"
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !managerData.potential,
                                    })}
                                />
                                {submitted && !managerData.potential && (
                                    <small className="p-invalid">
                                        Potential is required.
                                    </small>
                                )}
                            </div>
                        </div>


                        <div className="field">
                            <label htmlFor="managerData">Feedback</label>
                            <InputTextarea
                                id="feedback"
                                value={managerData.feedback}
                                onChange={(e) =>
                                    onInputChange(e, "feedback")
                                }
                                required
                                rows={3}
                                cols={20}
                            />
                        </div>
                    </Dialog>

                    <Dialog visible={deleteDataDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDataDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {managerData && (
                                <span>
                                    Are you sure you want to delete <b>{managerData.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default  Manager_Panel;

