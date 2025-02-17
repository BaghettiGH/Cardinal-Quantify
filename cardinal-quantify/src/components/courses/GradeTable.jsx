import React from 'react'


function CalculateButton(){
    const handleClick = () => {
        alert("Button Clicked!");
    };
    return <button onClick={handleClick}>Calculate</button>
}

function GradeTable(){
return(
<div className = "GradeTable">
    <table>
        <thead>
        <tr>
            <th>Item Name</th>
            <th>Weight</th>
            <th>Grade</th>
            <th><CalculateButton /></th>

        </tr>
        </thead>






    </table>
</div>




    );
}

export default GradeTable;
export { CalculateButton}