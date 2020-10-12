import React, { FC } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';

type CreateNewRowControlProps = Omit<ButtonProps, 'size' | 'variant'>;

const CreateNewRowControl: FC<CreateNewRowControlProps> = (props) => {
    return (
        <Button {...props} size="sm" variant="info">
            Create new
        </Button>
    );
};

export default CreateNewRowControl;
