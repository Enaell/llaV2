import React from 'react';
import { Row } from '../common/Flexbox';
import { useSelector } from 'react-redux';

function Footer() {

  const palette = useSelector((state: any) => state.theme.palette)
  return(
    <Row horizontal='space-around' width='100%' style={{ padding: '20px 0 20px 0', backgroundColor : palette.primary.main, color: 'white'}}>
      <div className="col-12">
        <p className="text-muted credit">Footer</p>
      </div>
    </Row>
  )
}

export default Footer;