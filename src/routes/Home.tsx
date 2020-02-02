import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";

const BorderedTable = styled.table`
  td {
    border-bottom: 1px solid #ccc;
    padding: 3px;
  }
`;

export default function Home() {
  return (
    <>
      <h1>Welcome to the CDAC League!</h1>

      <Row>
        <Col span={6}>
          <h3>KC Points</h3>
          <BorderedTable>
            <tbody>
              <tr>
                <td>1st</td>
                <td>20</td>
              </tr>
              <tr>
                <td>2nd</td>
                <td>19</td>
              </tr>
              <tr>
                <td>3rd</td>
                <td>18</td>
              </tr>
              <tr>
                <td>4th</td>
                <td>17</td>
              </tr>
              <tr>
                <td>5th</td>
                <td>16</td>
              </tr>
              <tr>
                <td>6th</td>
                <td>15</td>
              </tr>
              <tr>
                <td>7th</td>
                <td>14</td>
              </tr>
              <tr>
                <td>8th</td>
                <td>13</td>
              </tr>
              <tr>
                <td>9th</td>
                <td>12</td>
              </tr>
              <tr>
                <td>10th</td>
                <td>11</td>
              </tr>
              <tr>
                <td>10+</td>
                <td>10</td>
              </tr>
              <tr>
                <td>Clear rounds</td>
                <td>2</td>
              </tr>
            </tbody>
          </BorderedTable>
        </Col>
        <Col span={6}>
          <h3>Other Points</h3>
          <BorderedTable>
            <tbody>
              <tr>
                <td>1st</td>
                <td>10</td>
              </tr>
              <tr>
                <td>2nd</td>
                <td>9</td>
              </tr>
              <tr>
                <td>3rd</td>
                <td>8</td>
              </tr>
              <tr>
                <td>4th</td>
                <td>7</td>
              </tr>
              <tr>
                <td>5th</td>
                <td>6</td>
              </tr>
              <tr>
                <td>6th</td>
                <td>5</td>
              </tr>
              <tr>
                <td>7th</td>
                <td>4</td>
              </tr>
              <tr>
                <td>8th</td>
                <td>3</td>
              </tr>
              <tr>
                <td>9th</td>
                <td>2</td>
              </tr>
              <tr>
                <td>10th+</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Clear rounds</td>
                <td>1</td>
              </tr>
            </tbody>
          </BorderedTable>
        </Col>
      </Row>
      <p>
        <strong>
          All classes count, including special classes and fun classes
        </strong>
      </p>

      <p>The league is split into 3 groups:</p>
      <BorderedTable>
        <tbody>
          <tr>
            <td>Beginner</td>
            <td>Grades 1 and 2</td>
          </tr>
          <tr>
            <td>Novice</td>
            <td>Grades 3, 4, and 5</td>
          </tr>
          <tr>
            <td>Senior</td>
            <td>Grades 6 and 7</td>
          </tr>
        </tbody>
      </BorderedTable>
      <p>You will be competing in your own group.</p>
      <p>
        At the end of the year, the winnner of each group will win a trophy, and
        we will do rosettes for 1st, 2nd and 3rd.
      </p>
    </>
  );
}
