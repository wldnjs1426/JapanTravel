import React from 'react';
import Axios from 'axios';
import styled from "styled-components";
import { useForm } from 'react-hook-form';


const Wrap = styled.div`
    width: 1hr;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content:flex-end;
    align-items: center;
`
const Container = styled.div`
    width:50%;
    height:80%;
    border:1px solid black;
    display:flex;
    justify-content:center;
`
const Form = styled.form`
`
const Table = styled.table`
    width:100%;
    border-collapse: collapse
`
const Tr = styled.tr`
    width:100%;
    border-bottom:1px solid gray;

`
const TitleTd = styled.td`
`
const Td = styled.td`
`
const Input =styled.input`
    visibility: hidden;
`

function Admin({match}){
    
    let data = null

    if(match.params.id !== "false"){
        data = {
            id:match.params.id,
            category:match.params.category
        }
    }
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("img", data.Thumbnail_img[0]);
        
        Axios.post('http://127.0.0.1:8000/Create',data
        ).then((res) => {
            alert("성공")
        }).catch((err) => {
            alert("Error")
        });
        Axios.post('http://127.0.0.1:8000/Create',formData
        ).then((res) => {

        }).catch((err) => {

        });
    }
    return(
        <Wrap>
            <h1>
                {data === null ? "데이터 작성" : "데이터 수정"}
            </h1>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Table>
                        <thead></thead>
                        <tbody>
                            {data === null ? <></>  :
                                <Tr>
                                    <TitleTd>-컨텐츠 ID</TitleTd>
                                    <Td colSpan="2">{data.id}</Td>
                                    <Td><Input type = "text" name = "id" value={data.id} {...register("id")}/></Td>    
                                </Tr>}
                            <Tr>
                                <TitleTd>
                                    - 컨텐츠 
                                </TitleTd>
                                <Td>
                                    <select name="contents" {...register("contents")}>
                                        <option value = "CA01">관광지</option>
                                        <option value = "CA02">음식점</option>
                                        <option value = "CA03">쇼핑몰</option>
                                    </select>
                                </Td>
                                <TitleTd>
                                    - 지역 
                                </TitleTd>
                                    <Td>
                                        <select name="area"  {...register("area")}>
                                            <option value = "AR01">도쿄</option>
                                            <option value = "AR02">오사카</option>
                                            <option value = "AR03">도호쿠</option>
                                            <option value = "AR04">삿포로</option>
                                        </select>
                                    </Td>
                                
                            </Tr>    
                            <Tr>
                                <TitleTd>
                                    - 이름  
                                </TitleTd>
                                <Td><input type ="text"  name ="name"  {...register("name")}/></Td>
                                <TitleTd>
                                    - 이름 (일본어) 
                                </TitleTd>
                                <Td><input type = "text" name = "japan_name"  {...register("japan_name")}/></Td>
                            </Tr>
                            <Tr>
                                <TitleTd>
                                    - 썸네일이미지  
                                </TitleTd>
                                <Td colSpan="3"><input type = "file" name = "Thumbnail_img" accept='image/*'  {...register("Thumbnail_img")} /></Td>
                            </Tr>
                            <Tr>
                                <TitleTd>
                                    - 썸네일텍스트 
                                </TitleTd>
                                <Td colSpan="3">
                                    <textarea cols="50"  rows="5" name="Thumbnail_text" {...register("Thumbnail_text")}></textarea>
                                </Td>
                            </Tr>
                            <Tr>
                                <TitleTd>
                                    - 전화번호
                                </TitleTd>
                                <Td colSpan="3">
                                    <input type="tel" name="tel" {...register("tel")}/>
                                </Td>
                            </Tr>
                            <Tr> 
                                <TitleTd>
                                    - 주소
                                </TitleTd>
                                <Td colSpan="3">
                                    <input type = "text" name = "address1" {...register("address1")}/> 
                                    <input type = "text" name = "address2" {...register("address2")}/> 
                                </Td>
                                
                            </Tr>
                            <Tr>
                                <TitleTd>
                                    - 디테일텍스트
                                </TitleTd>
                                <Td colSpan="3">
                                    <textarea cols="50" rows="5" name="detail_text"  {...register("detail_text")}></textarea>
                                </Td>
                            </Tr>
                            <Tr>
                                <TitleTd>
                                    - 좌표(위도)
                                </TitleTd>
                                <Td>
                                    <input type="text" name="coordinate_lat" {...register("coordinate_lat")}/>
                                </Td>
                                <TitleTd>
                                    - 좌표(경도)
                                </TitleTd>
                                <Td>
                                    <input type="text" name="coordinate_lng" {...register("coordinate_lng")}/>
                                </Td>
                            </Tr>
                            <Tr>
                                <TitleTd>
                                    - 매장 시간
                                </TitleTd>
                                <Td colSpan="3"> 
                                    <input type = "text" name = "opening" {...register("opening")}/> - <input type = "text" name = "closing" {...register("closing")}/>  
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                <input type="submit" value="완료"></input>
                                </Td>
                            </Tr>
                        </tbody>
                        <tfoot></tfoot>
                    </Table>
                </Form>
            </Container>
        </Wrap>
    )
};
export default Admin;