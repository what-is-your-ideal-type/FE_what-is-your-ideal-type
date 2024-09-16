import { FlexBox } from "../components/FlexBox"
import React, { useState } from "react"
import { Text } from "../components/Text"
import { Main } from "../components/Main"
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { useNavigate } from "react-router-dom"

const GenderSelect = () => {
    const navigate = useNavigate()
    const [checkedValue, setCheckedValue] = useState<'man' | 'woman' | null>(null)

    return(
    <>
        <Header></Header>
        <Main>
            <FlexBox direction="column" gap="100px">
                <FlexBox direction="column">
                    <FlexBox direction="column" gap="8px">
                        <Text  fontSize="lg" fontWeight="bold">이상형 선택하기</Text>
                        <Text style={{ whiteSpace: "pre-line", textAlign: "center"}}>{"아래 정보를 입력하면 \n 당신의 이상형을 알려드려요!"}</Text>
                    </FlexBox>
                </FlexBox>
                <FlexBox direction="column" gap="8px" style={{alignItems: "flex-start"}}>
                    <Text fontWeight="bold">이상형의 성별</Text>
                    <FlexBox gap="20px">
                        <Button bgColor={checkedValue === 'man' ? "main" : "sub"} onClick={() => setCheckedValue('man')} width="166px" height="56px">남성</Button>
                        <Button bgColor={checkedValue === 'woman' ? "main" : "sub"} onClick={() => setCheckedValue('woman')} width="166px" height="56px">여성</Button>
                    </FlexBox>
                </FlexBox>
                <Button width="100%" height="64px" onClick={() => navigate('/survey', { state:  checkedValue })}>테스트 시작하기</Button>
            </FlexBox>
        </Main>
    </>
    )
}

export default GenderSelect