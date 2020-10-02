import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

interface RowsPerPageControlProps {
    changeRowsPerPage: (rowsPerPage: number) => void;
}

const RowsPerPageControl: FunctionComponent<RowsPerPageControlProps> = ({ changeRowsPerPage }) => {
    const [key, setKey] = useState<string | null>('10');

    const dropdownKeys = useMemo((): string[] => {
        return ['5', '10', '20', '50', '100'];
    }, []);

    useEffect(() => {
        changeRowsPerPage(Number(key));
    }, [changeRowsPerPage, key]);

    const handleDropDownSelect = (eventKey: string | null) => {
        setKey(eventKey);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic" size="sm">
                {key}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {dropdownKeys.map((element) => (
                    <Dropdown.Item
                        eventKey={element}
                        active={element === key}
                        onSelect={handleDropDownSelect}
                    >
                        {element}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default RowsPerPageControl;
