import React from 'react';
import { SeverityProps } from '../../types';

export const Severity = ({ isModalOpen, triggerRef, handleSeverityChange }: SeverityProps) => {
  const severityOptions = ['normal', 'important', 'urgent'];

  const modalStyle: React.CSSProperties = {
    position: 'absolute',
    top: triggerRef ? triggerRef.current?.offsetHeight : '0',
    right: '0',
    width: '200px',
    padding: '1rem',
    background: 'white',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
    display: isModalOpen ? 'flex' : 'none',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '0.5rem',
  };

  return (
    <div style={{ position: 'relative' }}>
      {isModalOpen && (
        <dialog open>
          <div style={modalStyle}>
            <h2>Select Severity</h2>
            <ul>
              {severityOptions.map((severity, id) => (
                <li key={id} onClick={() => handleSeverityChange(severity)}>
                  {severity}
                </li>
              ))}
            </ul>
          </div>
        </dialog>
      )}
    </div>
  );
};
