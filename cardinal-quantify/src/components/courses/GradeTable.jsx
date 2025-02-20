import React from 'react';
import "../../styles/courses.scss";

// function CalculateButton(){
//     const handleClick = () => {
//         alert("Button Clicked!");
//     };
//     return <button onClick={handleClick}>Calculate</button>;
// }

function GradeTable(){
return(
    <table border="1">
        <thead>
        <tr>
            <th>Item Name</th>
            <th>Weight</th>
            <th>Grade</th>
            <th></th>

        </tr>
        </thead>
        <tbody>
        <tr>    
            <td>Assignment 1</td>
            <td>50%</td>
            <td>90%</td>
            <td></td>
        </tr>
        <tr>
            <td>Assignment 2</td>
            <td>50%</td>
            <td>80%</td>
            <td></td>
        </tr>


        </tbody>

    </table>




    );
};

export default GradeTable;
// export { CalculateButton};