import React from 'react';

const Table = (props) => {
  const header = props.thead.map((value, index) => {
    return <th key={index}>{value}</th>
  });

  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            {header}
          </tr>
        </thead>
        <tbody>
          {props.tbody}
        </tbody>
      </table>
    </div>
  )
}

export default Table;