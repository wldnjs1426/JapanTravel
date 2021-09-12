import React from 'react';
import { useEffect, useState } from "react"
import Axios from 'axios';
import {Link} from 'react-router-dom'
import DetailMap from './DetailMap';
import Nav from './Nav';
import styled from "styled-components";
import Footer from './Footer';

const Div = styled.div`
    display: flex;
    align-items: flex-end;
    width:1fr;
    height: 100vh;
`
const DetailDiv = styled.div`
    width: 50%;
    height: 99%;
    background-color: white;
`
const Section = styled.section`
    width: 100%;
    height: 50%;
    background-size:cover;
    background:url(${props => props.img});
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    
`
const BlurDiv = styled.div`
    position: absolute;
    width: 100%;
    height: 101%;
    z-index: 1;
    -webkit-backdrop-filter: blur(150px);
    backdrop-filter: blur(150px);
    
`
const ThumbnailImgDiv = styled.div`
    width: 350px;
    height: 300px;
    z-index: 2;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
`
const ThumbnailInfoDiv = styled.div`
    width: 350px;
    height: 300px;
    color:white;
    z-index: 2;

`
const Span = styled.span`
    display:flex;
    margin-top:180px;
`
const TextDiv = styled.div`
    width: 100%;
    height: 200px;
    margin-left:25px;
    z-index: 2;
`
const DetailSection = styled.section`
    display:flex;
    flex-direction:column;
    justify-content: space-around;

`
const Ul = styled.ul`
    display: flex;
    height:140px;
    flex-direction:column;
    justify-self: flex-end;
    
`
const Li = styled.li`
    width: 90%;
    height: 100px;
    display: flex;
    align-items: center;
    border-bottom:1px solid rgb(189, 187, 187) ;
`
const HeadLi = styled.li`
    width: 90%;
    height: 100px;
    display: flex;
    align-items: center;
    color:red;
    font-size:15px;
    font-weight:bold;   
`
const Table = styled.table`
    width:100%;

`
const Tr = styled.tr`
    height:30px;
`
const Td = styled.td`
    width:20%;
`
const ListDiv = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-end;
`
const MapDiv = styled.div`
    width:50%;
    height:90%;
    position:fixed;
    right:0;
    bottom:0;
`
const FooterDiv = styled.div`
    margin-top:20px;
    width:99%;
    height:150px;
`
function DetailPage({match}) {

    const [detailData,setdetailData] = useState([]);
    const [categoryData,setcategoryData] = useState([]);
    const [areaData,setareaData] = useState([]);
    const category = match.params.category
    const id = match.params.id
    const area = match.params.Area

    let CategoryKorea 
    if(category === "tourlist"){
        CategoryKorea = "관광지"
    }else if(category === "food"){
        CategoryKorea = "음식점"
    }else{
        CategoryKorea = "쇼핑몰"
    }

    useEffect(()=>{
        Axios.get('http://192.168.0.2:8000/detail',{
        params: {
            id: id,
            Category: category
        }
        }).then((response)=>{
            setdetailData(response.data);
        }).catch((error) =>{
            console.log(error)
        })
        Axios.get('http://192.168.0.2:8000/detailC',{
        params: {
            id: id,
            Category: category
        }
        }).then((response)=>{
            setcategoryData(response.data);
        })
        Axios.get('http://192.168.0.2:8000/detailA',{
        params: {
            Area: area
        }
        }).then((response)=>{
            setareaData(response.data);
        })
    },[category,id,area])

return(
    <Div>
        {detailData.map(data =>(
            <DetailDiv key={data.id}>
                    <Nav Area={match.params.AreaName} Category={CategoryKorea} Name={data.name} />

                
                <Section img={data.Thumbnail_img} >
                    <BlurDiv></BlurDiv>
                    <ThumbnailImgDiv>
                        <Img src={`${data.Thumbnail_img}`}/>
                    </ThumbnailImgDiv>
                    <ThumbnailInfoDiv>
                        <ul>
                            <li style={{fontSize: "25px",fontWeight:"600", marginBottom:"10px"}}>{data.name}</li>
                            <li style={{fontSize: "15px",fontWeight:"100"}}>({data.Japan_name})</li>
                            <Span>
                            {areaData.map(data =>(
                                <li key={data.id}>{data.detail_nm}&nbsp;&nbsp;{`>`}&nbsp;&nbsp;</li>
                            ))}
                            {categoryData.map(data =>(
                                <li key={data.id}>{data.category_nm}  </li>
                            ))}
                            
                            </Span>
                        </ul>
                    </ThumbnailInfoDiv>
                </Section>
                <DetailSection>
                    <TextDiv>
                        <Ul>
                            <HeadLi>개요</HeadLi>
                            <Li>{data.Thumbnail_text}</Li>
                        </Ul>
                    </TextDiv>
                    
                    <TextDiv>
                        <Ul>
                            <HeadLi>시설 설명</HeadLi>
                            <Li>{data.Detail_text}</Li>
                        </Ul>
                    </TextDiv>

                    <TextDiv>
                        <Ul>
                            <HeadLi>시설 기본정보</HeadLi>
                            <Li>
                                <Table>
                                    <thead></thead>
                                    <tbody>
                                        <Tr>
                                            <Td>주소</Td>
                                            <td>{data.Address}</td>
                                        </Tr>
                                        <Tr>
                                            <Td>전화번호</Td>
                                            <td>{data.phone_number}</td>
                                        </Tr>
                                        <Tr>
                                            <Td>영업시간</Td>
                                            <td>{data.Opening_hours}</td>
                                        </Tr>
                                    </tbody>
                                </Table>
                            </Li>
                        </Ul>
                        <ListDiv>
                            <Link to={`/map/${match.params.category}`}>
                                <button>목록</button>
                            </Link>
                        </ListDiv>
                    </TextDiv>
                </DetailSection>
                <FooterDiv>
                    <Footer />
                </FooterDiv>
            </DetailDiv>
        ))}
        {detailData.map(data =>(
            <MapDiv>
                <DetailMap lat={data.coordinate_lat} lng={data.coordinate_lng} name={data.name} />
            </MapDiv>
        ))}
    </Div>
    

)
}
export default DetailPage