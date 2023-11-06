import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            {/* <img src={`/layout/images/`} alt="Logo" height="20" className="mr-2" /> */}
            © Copyright
            <span className="font-medium ml-2">Nitto Digital - {new Date().getFullYear()} </span>
        </div>
    );
};

export default AppFooter;
