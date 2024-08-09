import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { css } from 'styled-system/css';
import { EyeOpenIcon, LockClosedIcon, TrashIcon, CardStackIcon } from '@radix-ui/react-icons';

const dropdownTriggerStyle = css({
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  border: '1px solid #E0E0E0',
  backgroundColor: '#fff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.5rem',
  fontSize: '1rem',
  fontWeight: '500',
  color: '#1C1C1C',
});

const dropdownContentStyle = css({
  borderRadius: '8px',
  border: '1px solid #E0E0E0',
  backgroundColor: '#fff',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  width: '250px',
  zIndex: '1000',
});

const itemStyle = css({
  display: 'flex',
  alignItems: 'center',
  padding: '0.75rem 1rem',
  fontSize: '1rem',
  fontWeight: '400',
  color: '#1C1C1C',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#F5F5F5',
  },
});

const iconStyle = css({
  marginRight: '0.75rem',
  color: '#6B7280',
});

const headerStyle = css({
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #E0E0E0',
  backgroundColor: '#F5F5F5',
  fontWeight: '500',
  color: '#1C1C1C',
  display: 'flex',
  alignItems: 'center',
});

const DynamicDropdown: React.FC = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={dropdownTriggerStyle}>
          Optionen
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={dropdownContentStyle} sideOffset={5}>
          <div className={headerStyle}>
            <CardStackIcon className={iconStyle} />
            Artikel bearbeiten
          </div>
          <DropdownMenu.Item className={itemStyle}>
            <EyeOpenIcon className={iconStyle} />
            Ausblenden
          </DropdownMenu.Item>
          <DropdownMenu.Item className={itemStyle}>
            <LockClosedIcon className={iconStyle} />
            Preisangabe
          </DropdownMenu.Item>
          <DropdownMenu.Item className={itemStyle}>
            <TrashIcon className={iconStyle} />
            Löschen
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DynamicDropdown;
