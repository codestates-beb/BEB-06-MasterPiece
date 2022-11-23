# BEB-06-FINAL-05
# Meeting Minutes

2022’Nov-10
* Project 기간 : Nov’10 ~ Dec05
* 팀장님 : 문지훈 
* 팀결성 :  문지훈, 김나혜, 정다운, 김준섭 ( SBT 활용한 NFT 조각 투자 &  community 마켓플레이스 )
* 미팅시간 : 매일 ( 오후 : 14:00~ )
* 파트 : FE ( 문지훈, 김나혜) / BE (정다운, 김준섭) / SM,Web3( 김준섭, 문지훈, 김나혜,정다운 )
* SBT/ DAO 시스템에 대한 학습 이후 월요일 부터 본격 시작
    * BE / FE 쪽은 추후 논의
* FE wire frame 할 에정 
* 김준섭 : 오전 10:00~11:00 , 14:00~ , ( 수요일 오전(x), 금요일 오후(x)), 19일 면접 ( 다음주 정신없을 수 …)
* 정다운 : 면접시간만 피하면… 
* 역할 : 김준섭 (회의록 서기 ) , 문지훈 (CTO) , 김나혜 (인턴2) , 정다운 ( 인턴 )
* Overall Plan : 
<img width="891" alt="image" src="https://user-images.githubusercontent.com/81156500/201584006-b20030bc-b1f8-4326-9c9d-9afbd334b72a.png">


2022’Nov-14 ( 14:00 - )
* FE / BE mock up 공유
* BE 비중에 대한 추가 논의
* SBT 컨트렉 논의
    * 소울월렛 ( 가디언 ) 에 대한 검토
    * SBT token 의 저장 방식 (?)
* NTT(Non transferable token ) / ABT ( Acoount Bound Token)  공부 

2022’Nov-16 
( 10:00~ ) 
* 멘토님과 논의 주제에 대한 논의
    * DB 및 BE 의존도 에 대한 논의
        * 무조건적인 DB 사용 보다는, 필요한 경우에 대해서 적용할 수 있도록 구현
    * SBT 활용도 논의 
    * FE 구현 하면서 -> SM / BE 단 구현 


(15:00~ )
* 멘토님과의 1차 멘토링 진행
    * 정책에 대한 검토 필요 ( 악의적 사용자, 기타 등등 )
    * FE/BE/SM 의 적절한 배치에 대한 추천
    * 대중적인 것이 좋을 수도 있다 -> 포트폴리오, 기업을 위해서도 ..
    * 각 구현 요소마다 정당성 ( 왜? , 명분 ? ) 에 대한 검토 필요
* 미팅
    * 정책에 대해서 브레인스토밍 해보기 
        * 악의적인 사용자
        * 투표조작…. 
    * SBT 토큰을 소유한 사람이 이용할 수 있는 서비스에 대한 검토
        * 옥션…
        * BE 구현 가능할거같고 
        
 2022’Nov-17
(14:00-)
* 다시 생각해보기
    * NFT 마켓 플레이스
        * NFT 판매
            * 일반NFT 
            * 조각투자하는 NFT
        * 조각 투자용 ERC20 코인 판매

    * BE 비중이 생기면서, SBT 토큰활용하여 BE 별도 기능 구현하는 것에 대한 검토
        * 
* DB 와 block 간의 동기화에 대한 연구(확인필요)
    * ex) A 마켓, B 마켓 에 모두 등록을 했을 때, 한쪽에서 팔린경우 어떻게 동기화 ? 
* Planning
    * 금주까지 기능 구현에 대한 플래닝 
    * 차주 정도 구현 시작 
 
 2022’Nov-18
(10:00- )
* 전체적인구조
    * 조각 NFT 구조
        * 조각 NFT 발행 : ERC- 20 - SBT. / SBT 만들지 ( 판매를 가능 / 불가능 )
        * 악용될 사례 ( 51% , 참여하지 않는경우 ) …. 지속적인 생각
    * BE
        * Opensea API 에서 개인 주소별 등록된 NFT list 를 끌어와서, sell 의 true/false 경우를 나누어서 DB update
        * DB - create / update / delete
        * DB - 안건 에 대한 저장
* SBT 의 의미를 생각해보기 
    
  2022’Nov-23 
  < 14:00~ >
* FE ( css : 70% / 기능 : 구현중 )
    * Mock up 대로 진행 
* BE
    * 일반 NFT 용 table
        * 저장 : 최초 발행 시 저장
        * Query - 판매등록이 true 경우 /  adress & 판매등록 true / address
        * Update : 판매되면 주소 변경  / 판매등록 false -> true 
      <img width="744" alt="image" src="https://user-images.githubusercontent.com/81156500/203484957-0fe21faa-8fb1-4618-99ca-0fa883b65f99.png">
     * 조각 NFT 용 table
       * 중개자 NFT/ SBT 민트 -> 지원자 받아서 -> soul drop
       <img width="720" alt="image" src="https://user-images.githubusercontent.com/81156500/203485037-01b83e46-74c1-4ad2-8346-851e4e7338b1.png">
     * DAO community 용 table
       * 저장/ 업데이트
       <img width="1090" alt="image" src="https://user-images.githubusercontent.com/81156500/203485142-7fe9d0ac-86fe-4984-833e-cfe293975eee.png">
    * Event market 용 table ( advanced )
* SM
    * 일반 NFT -> 기존
        * 등록 / 판매/ transfer
    * 조각 NFT ->  ERC1155 ( ERC721 - ERC20 ( 판매 안되는거로  ) -> air drop
        * NFT 발행 - ERC20 10개 발행
        * 
    * ERC- 20 : 투표 ( ) 
   < 15:00 ~ >
   1. 다음주에는 준비된 페이지들 구현된거 보여주면서 발표 
   2. dummydata 많이 만들어서 넣어두기 (1주일 간격보다는 10초 1분) 
   3. 컨트랙트 잘 되는지 체크 예외처리 상황만들면서 구현하기 
   4. 기획문서 준비 (ppt)만들어서 다음주에는 발표하기
    
 
