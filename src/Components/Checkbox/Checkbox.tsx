import React from 'react';
import { style } from './CheckboxStyle';

interface CheckboxProps {
  checked: boolean;
  onClick: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onClick }) => {
  return (
    <div>
      <Container>
        <HiddenCheckBox type="checkbox" defaultChecked={checked} />
        <CheckBox checked={checked} onClick={onClick}>
          <Icon viewBox="0 0 24 24">
            <polyline points="19 7 10 17 5 12" />
          </Icon>
        </CheckBox>
      </Container>
    </div>
  );
};

export default Checkbox;

const { Container, HiddenCheckBox, CheckBox, Icon } = style;
