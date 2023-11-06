import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { ToggleButton } from 'primereact/togglebutton';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { CategoryService } from '../../../demo/service/CategoryService';
import { CustomerInformationService } from '../../../demo/service/CustomerInformationService';
import { ZoneService } from '../../../demo/service/ZoneService';

const Customer_Info = () => {
    let emptyInfo = {
        id: 0,
        zone: '',
        category: '',
        name: '',
        address: [{val: '', id: 0}],
        asset: [''],
        phone: '',
        email: '',
        whatsapp: '',
        details: '',
    };

    const [infoDatas, setInfoDatas] = useState(null);
    const [dataDialog, setDataDialog] = useState(false);
    const [deleteDataDialog, setDeleteDataDialog] = useState(false);
    const [infoData, setInfoData] = useState(emptyInfo);
    const [selectedDatas, setSelectedDatas] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [msZone, setMsZone] = useState(null);
    const [msCategory, setMsCategory] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [toggleRefresh, setTogleRefresh] = useState(false);


    useEffect(() => {

        CustomerInformationService.getCustomerInfo().then((res) => setInfoDatas(res.data.AllData));
        ZoneService.getZone().then((res) => setMsZone(res.data.AllData));
        CategoryService.getCategory().then((res) => setMsCategory(res.data.AllData));

    }, [toggleRefresh]);

    const openNew = () => {
        setInfoData(emptyInfo);
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

        console.log("PPPP1",infoData)

        if( infoData.zone && infoData.category && infoData.name && infoData.address && infoData.asset || infoData.phone || infoData.email || infoData.whatsapp || infoData.details , infoData._id ) {
            CustomerInformationService.editCustomerInfo(
                infoData.zone,
                infoData.category,
                infoData.name,
                infoData.address,
                infoData.asset,
                infoData.phone,
                infoData.email,
                infoData.whatsapp,
                infoData.details,
                infoData._id,
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Information is Updated', life: 3000 });
            })
        } else if( infoData.zone && infoData.category && infoData.name && infoData.address && infoData.asset) {
            CustomerInformationService.postCustomerInfo(
                infoData.zone,
                infoData.category,
                infoData.name,
                infoData.address,
                infoData.asset,
                infoData.phone,
                infoData.email,
                infoData.whatsapp,
                infoData.details,
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'New Information is Created', life: 3000 });
            })
        }
    };

    const editData = (infoData) => {
        setInfoData({ ...infoData });
        setDataDialog(true);
    };

    const confirmDeleteData = (infoData) => {
        setInfoData(infoData);
        setDeleteDataDialog(true);
    };

    const deleteData = () => {
        CustomerInformationService.deleteCustomerInfo(infoData._id).then(() => {
            setTogleRefresh(!toggleRefresh);
            setDeleteDataDialog(false);
            setInfoData(emptyInfo);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer is Deleted', life: 3000 });
        })
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let data = { ...infoData };
        data[`${name}`] = val;

        setInfoData(data);
    };

    const onSelectionChange = (e, name) => {
        let _infoData = {...infoData };
        _infoData[`${name}`] = e.value;
        setInfoData(_infoData);
    }

    const onAdrressChange = (e, name, i, previous_address) => {
        console.log('onAdrressChange-----------------',e.target?.value, name, i, previous_address)
        let val = (e.target && e.target.value) || ''; 
        let _data = {...infoData};
        const num = Math.random().toString().slice(2);
        _data[name][i] = {add: val, id: previous_address?.id || num};
        setInfoData(_data);

    }

    const onAssetChange = ( e, name, i) => {
        let val = (e.target && e.target.value) || '';
        let _data = { ...infoData };
        _data[name][i] = val;
        setInfoData(_data);

    }

    const filteredZone = msZone?.filter((item) => item.is_active == '1');
    const zoneList = filteredZone?.map(item => {
        return { label: item.name, value: item.name }
    })

    const filteredCategory = msCategory?.filter((item) => item.is_active == '1');
    const categoryList = filteredCategory?.map(item => {
        return { label: item.name, value: item.name}
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
                {rowData.address.map(item=><ul><li>{item.add}</li></ul>)}
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

    const statusBodyTemplate = (rowData) => {
        return (
            <ToggleButton onLabel="Active" offLabel="Inactive" onIcon="pi pi-check" offIcon="pi pi-times" 
            checked={rowData.is_active != '0'} onChange={(e) => {
                let is_active = '0';
                if (rowData.is_active == '0') {
                    is_active = '1'
                }
                CustomerInformationService.toggleCustomerInfo(is_active, rowData._id).then(() => {
                setTogleRefresh(!toggleRefresh)
                })
             }} />
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
                    <h2 className="m-0">Customer Information</h2>
                </div>
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <Button
                    label="Add Information"
                    icon="pi pi-plus"
                    severity="sucess"
                    className="mr-2"
                    onClick={openNew}
                />
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

    if(infoDatas == null) {
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

    function onAdd(){
        const newInfoData = {...infoData}
        const num = Math.random().toString().slice(2);
        const newAddr = {val: '', id: num}
        newInfoData.address = [...infoData.address, newAddr]
        setInfoData(newInfoData)
    }

    function onAsset() {
        const newInfoData = {...infoData}
        newInfoData.asset = [...infoData.asset, '']
        setInfoData(newInfoData);
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
                        value={infoDatas}
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
                        emptyMessage="Customer Information is Empty."
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
                            header="Status"
                            body={statusBodyTemplate}
                            headerStyle={{ minWidth: "5rem" }}
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
                                <label htmlFor="infoData">Zone</label>
                                <Dropdown
                                    value={infoData.zone}
                                    name='zone'
                                    onChange={(e) => onSelectionChange(e, "zone")}
                                    options={zoneList}
                                    optionLabel="value"
                                    showClear
                                    placeholder="Select a Zone"
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !infoData.zone,
                                    })}
                                />
                                {submitted && !infoData.zone && (
                                    <small className="p-invalid">
                                        Zone is required.
                                    </small>
                                )}
                            </div>
                            <div className="field col">
                                <label htmlFor="infoData">Category</label>
                                <Dropdown
                                    value={infoData.category}
                                    name='doctor'
                                    onChange={(e) => onSelectionChange(e, "category")}
                                    options={categoryList}
                                    optionLabel="label"
                                    showClear
                                    placeholder="Select a Category"
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !infoData.category,
                                    })}
                                />
                                {submitted && !infoData.category && (
                                    <small className="p-invalid">
                                        Category is required.
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="infoData">Name</label>
                                <InputText
                                    id="name"
                                    value={infoData.name}
                                    onChange={(e) => onInputChange(e, "name")}
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !infoData.name,
                                    })}
                                />
                                {submitted && !infoData.name && (
                                    <small className="p-invalid">
                                        Name is required.
                                    </small>
                                )}
                            </div>
                            <div className="field col">
                                <label htmlFor="infoData">Phone</label>
                                <InputText
                                    id="age"
                                    value={infoData.phone}
                                    onChange={(e) => onInputChange(e, "phone")}
                                />
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="infoData">Email</label>
                                <InputText
                                    id="email"
                                    value={infoData.email}
                                    onChange={(e) => onInputChange(e, "email")}
                                />
                            </div>
                            <div className="field col">
                                <label htmlFor="infoData">What's App</label>
                                <InputText
                                    id="whatsapp"
                                    value={infoData.whatsapp}
                                    onChange={(e) => onInputChange(e, "whatsapp")}
                                />
                            </div>
                        </div>

                        {infoData.address.map((address, i) => {
                            console.log('val---------------------------------', address)
                            return (
                                <div className="field" key={i}>
                                    <label htmlFor="infoData">Address</label>
                                    <InputText 
                                        id="address" 
                                        autoFocus={true}
                                        value={address.add} 
                                        onChange={(e) => onAdrressChange(e, "address", i, address)}
                                        className={classNames({
                                            "p-invalid": submitted && !infoData.address,
                                        })} 
                                    />
                                    {submitted && !infoData.address && (
                                        <small className="p-invalid">
                                            Address is required.
                                        </small>
                                    )}
                                </div>
                            )   
                        })}

                        <Button label="Add" icon="pi pi-plus" severity="sucess" className="mr-2 mb-3 w-10rem" onClick={onAdd} />
                        
                        {infoData.asset.map((val, i) => {
                            return (
                                <div className="field" key={i}>
                                    <label htmlFor="infoData">Asset</label>
                                    <InputText 
                                        id="asset" 
                                        autoFocus={true}
                                        value={infoData.asset[i]} 
                                        onChange={(e) => onAssetChange(e, "asset", i)} 
                                        className={classNames({
                                            "p-invalid": submitted && !infoData.asset,
                                        })}
                                    />
                                    {submitted && !infoData.asset && (
                                    <small className="p-invalid">
                                        Asset is required.
                                    </small>
                                    )}
                                </div>
                            )   
                        })}

                        <Button label="Add" icon="pi pi-plus" severity="sucess" className="mr-2 mb-3 w-10rem" onClick={onAsset} />

                        <div className="field">
                            <label htmlFor="details">Details</label>
                            <InputText 
                                id="details" 
                                value={infoData.details} 
                                onChange={(e) => onInputChange(e, "details")} 
                            />
                        </div>
                    </Dialog>

                    <Dialog visible={deleteDataDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDataDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {infoData && (
                                <span>
                                    Are you sure you want to delete <b>{infoData.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                    
                </div>
            </div>
        </div>
    );
};

export default  Customer_Info;

