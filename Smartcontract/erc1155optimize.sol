// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract masterpiece {
    // @ tokenId 별로 주소 및 토큰 갯수 
     mapping(uint256 => mapping(address => uint256)) public _balances;
    // @ SBT 발행 시 조각 NFT  ID 에서 참여한 Address 에 uri 할당 ( sould drop 에서 사용 )
     mapping (uint256=>mapping(address=>string)) public _sbtUri;
    // @ 발행하는 tokenId 의 URI
     mapping(uint256 => string) private _tokenURIs;
    // @ 조각NFT 발행사 (발행사 만이 컨트롤 가능하게 설정 필요함 )
     mapping(uint256 => address) private _owners;
    //@ 조각 NFT status  ( 0 -> default / 1 -> transfer , 2 -> staking)
     mapping (uint256 => uint256) public _nftstatus;

    //@ ERC1155 등록
    event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);
    //@ ERC721 등록
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    uint256 public tokenId = 0;
    address public owner; 
  
      constructor ( ) {
        owner = msg.sender; // 중개자만 컨트롤 가능하게 스마트컨트렉 발행 시 설정
        } 

    //@ 서비스 중개자만이 컨트롤 가능
    modifier onlyOwner()  {
    require(msg.sender == owner,"Caller is not owner");
    _;
    }

     // @ 조각 NFT & token 발행, 최초발행자에게 모든 코인 지급
     function mintpieceNFT( string memory uri, uint256 sbtamount )public onlyOwner() returns(bool) {
         _balances[tokenId][owner] = sbtamount; // 발행되는 SBT 토큰 갯수
         _tokenURIs[tokenId] = uri;
         _owners[tokenId] = owner;
         emit TransferSingle(owner,address(0),owner,tokenId,10);
         _changestatus(tokenId,0);
         _counter();
         return true;
     }
     //@ 발행 한 총 조각 갯수
     function getotalpiece () public view  returns(uint256){
         return tokenId-1;
     }

    //@ status 변경
     function _changestatus (uint256 id,uint256 stat) public {
         _nftstatus[id]= stat;
     }

     //@ Status 확인
     function showStatus (uint256 id) public view returns(uint256){
         return _nftstatus[id];
     }

      //@ Soul Drop / 1개씩 배분 / 중개인만 가능
     function souldrop(uint256 id, address to , string memory sbtUri) public onlyOwner() returns(string memory){
         require(_nftstatus[id]==0, "Not minted SBT or Not correct NFT status"); // status 및 mint 되었는지 확인
         require(_balances[id][owner] >=1, "No SBT balance on Owner"); // SBT balance 확인
         require(_balances[id][to] < 1,"Already get the SBT token"); // soul drop 받았는지 확인
         _balances[id][owner] -= 1;
         _balances[id][to] += 1;
        
         emit TransferSingle(owner,owner,to,id,1);
         return sbtUri;
     }

    //@ 조각 NFT 소유자, 초기에는 중개인
     function pieceowner ( uint256 id) public view returns(address) {
         return _owners[id];
     }

    //@ balance 조회
     function soulBalanceOf(uint256 id, address account) public view returns(uint256) {
         return _balances[id][account];
     }    

    //@ SBT tokenURI get (SBT 조각 NFT )
     function getNFTUri(uint256 id) public view returns(string memory){
         return _tokenURIs[id];
     }

     //@ sould uri 조회
     function getsouldUri (uint256 id, address account)public view returns(string memory) {
         return _sbtUri[id][account];
     }

     //@ SBT 참여자 탈퇴 ( 소각 )
     function dropSoulowner (uint256 id, address addr ) public onlyOwner returns(bool){
         require(_balances[id][addr]==1,"not owned SBT toekn");
         require(_balances[id][owner]!= 10,"SBT was not distributed");
         _balances[id][addr] = 0;
         _balances[id][owner] += 1;
         _sbtUri[id][addr] = ""; //할당했던 uri 제거
         emit TransferSingle(owner,addr,owner,id,1);
         return true;
     }

     //@ 조각 NFT 판매 , SBT 유저들은 토큰을 1개씩 가지고 있어서, 추후 SBT 참여자 이벤트에 참여가능함
     function piecetransfer ( uint256 id , address newowner) public onlyOwner() returns(bool){
         require(_nftstatus[id]==1,"NFT status is not on 'Sell'");
         require(_owners[id]==owner, "already transfer the NFT");
         _balances[id][owner] = 0;  //중개자가 추후 NFT 에 대해서 컨트롤 못하도록 balance 를 0 으로 수정 
         _owners[id] = newowner; //소유자 변경 , 또는 새로 발행 해줘도 됨 
         emit TransferSingle(owner, owner, address(0),id,0); // owner 정보에서 제거
         emit Transfer(address(0),newowner,id); //ERC721 로 등록 해주기
         return true;
     }
     //@ tokenId 증가
    function _counter () public returns(uint256) {
        tokenId = tokenId+1;   
        return tokenId;
    }

    //###### ERC-20 발행 ######

    //@ MasterPiece Project 내의 통용되는 총 화폐 /중개자만 발행 가능
    // ! 최초 mint 실행 시,Masterpiece SM address 에 돈이 발행 됨 !
    erc20BasicForm ERC20 = new erc20BasicForm(100000000); // 1억개 발행
    function erc20mint () public onlyOwner() returns(bool){
        ERC20.mint();
        return true;
    }
    //@ 유저간의 화폐 이동 ( 소유자만 보낼수 있게 처리해줘야함 )
    function erc20transfer(address from, address to, uint amount) public {
        require(from == msg.sender, "Woops! Can not send");
        ERC20._transfer(from,to,amount);
    }
    //@ 계좌별 발란스 조회
    function erc20balance(address account) public view returns(uint256) {
        return ERC20.balanceOf(account);
    }    

    //@ 전체유통량 조회
    function erc20totoalsupply() public view returns (uint256){
        return ERC20.totalSupply();
    }

    //####### Staking ########

    // (tokenId - 스테이키 정보 )
    mapping (uint256 => StakingInfo) _staking; //staking 기간, 마감일 설정
    // (tokenId - soul 유저 주소 - 수령 여부)
    mapping (uint256 => mapping(address => uint256)) _gettingrewardstatus;// 수령 후 1로 바뀜, 중복수령방지

    struct StakingInfo{
        uint256 duration; // 기간
        uint256 expiredate; // 마감일
        uint256 rewardexpiredate; // staking 수령 마감일 
        uint256 stakingstatus; // staking 동작 이후 1 로 변경해줌, 제안하면서 0으로 변경해줌
    }

    //@ staking 시작 및 staking 기간 설정
    //( pieceid : NFTid, duration: 기간설정, sec 단위 ) 
    function setStaking ( uint256 pieceid, uint256 duration) public onlyOwner() returns(uint256){
        require(_nftstatus[pieceid]==2,"Woops! Not able to staking"); // NFT status 가 2 일떄 가능
        require(_staking[pieceid].stakingstatus == 0,"Woops! Already staking"); //staking status 가 0일때 가능
        _staking[pieceid].expiredate = block.timestamp + duration;
        _staking[pieceid].duration = duration;
        _staking[pieceid].rewardexpiredate = block.timestamp + duration + 180 ;  // 3분 안에 수령 해야함
        _nftstatus[pieceid] =0 ; // nft id 의 status 를 0 으로 바꿔줌, 중복 스테이킹 방지, 이후 투표 결과로 바뀜
        _staking[pieceid].stakingstatus = 1; // staking 하면서 상태 바꿔줌
        return _staking[pieceid].duration;
    }

    //@ 이자 지급 ( msg.sender 만 받을 수 있음 )
    // (pieceid : NFTid, smAddr: SMaddress 주소) 
    function getStakingmoney (uint256 pieceid,address smAddr) public returns(uint256){
        require(block.timestamp > _staking[pieceid].expiredate,"Woops! Please wait for the expiration date!");// 스테이킹 기간지난 이후 받음
        require(soulBalanceOf(pieceid,msg.sender) ==1,"Not owned Soul"); // soul 가진 사람만 수령 가능
        require(_staking[pieceid].stakingstatus ==1,"Woops! It is not on staking"); // 스테이킹 status 가 1 일때만 받음, 제안상태에서 0으로 바꿔줌, 이후 스테키이세팅에서 1로 변경
        require(_gettingrewardstatus[pieceid][msg.sender]==0,"Woops! Already got tge reward"); // reward 보상 이력이 0 일때만 수령
        uint256 reward = 100 * _staking[pieceid].duration / 20;
    
        ERC20._transfer(smAddr,msg.sender ,reward); // owner 보유 토큰에서 reward 만큼 빠져 나감
        _gettingrewardstatus[pieceid][msg.sender] = 1; // 보상 수령 후 1 로 변경, 중복 수령 방지// 보팅단계에서 0으로 변경
        return reward;     
    }  

    //@ Staking 마감일 조회
    function _getexpireddate (uint256 pieceid ) public view returns(uint256){
        return _staking[pieceid].expiredate;
    }
    //@ Staking status 변경 ( 제안 하면서 변경 )
    function _changeStatusstaking (uint256 pieceid) external {
        require(block.timestamp > _staking[pieceid].rewardexpiredate, "Woops! Can not change the staking status"); // 보상 완료 받기전까지  변경 불가
        _staking[pieceid].stakingstatus = 0;
    }
    //@ Change voting history ( 투표 하면서 받음 )
    function _changeVotinghistory (uint256 pieceid, address account ) external {
        require(block.timestamp > _staking[pieceid].rewardexpiredate, "Woops! Can not change the staking status"); // 보상 완료 받기전까지  변경 불가
        _gettingrewardstatus[pieceid][account] = 0;
    }
}

///###### ERC-20 ###### -> 배포할 필요없음

contract erc20BasicForm   {
    mapping ( address => uint256) public _balance;
    mapping (address => mapping(address => uint256)) public _allowances; 
 
    event Transfer(address indexed from, address indexed to, uint256  value);

    uint256 public _totalSupply ; // 총발행량 
    string public _name;  // token 이름
    string public _symbol; // symbol

    constructor (uint256 amount) {
        _name = "SouldBoundToken";
        _symbol = "SBT";
        _totalSupply = amount;
        _balance[msg.sender] = amount;
    }

    function mint(   ) public {  
              emit Transfer(address(0),msg.sender,_totalSupply);
    }  

    function name() public view returns (string memory){
        return _name; //토큰 이름 
    }    
    function symbol() public view returns(string memory){
        return _symbol;// 토큰의 심볼
    }
    
    function totalSupply() external view virtual  returns (uint256){
        return _totalSupply; //총발행량
    }
    function balanceOf( address account) external view virtual  returns (uint256){
        return _balance[account]; //owner 가 가지고 있는 토큰의 보유량 확인
    }
     function transfer( address recipient, uint amount) public virtual  returns(bool){
        _transfer(msg.sender,recipient,amount); //전송 함수 실행 
        return true;        
    } 
      function _transfer( address sender, address recipient , uint256 amount) public virtual {
        require(sender != address(0),"ERC20: transfer from the zero address");
        require(recipient != address(0),"ERC20: transfer to the zero address");
        
        uint256 senderBalance = _balance[sender];
        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
       _balance[sender] = senderBalance-amount;
       _balance[recipient] =_balance[recipient]+amount;         
    }    
}

//##### Voting ######
contract DaoVoting {

    struct Voter{
        uint weight; // 권한이 있으면 1
        bool voted; // true : 투표 한 것
    }
    struct Propose {
        address soulowner;
        string proposeuri; // 기존 uri/ T/ S 넣는 곳
        string proposestring; // 추가 된 제안 
        uint256 agree; // 동의
        uint256 disagree; // 반대
        uint256 expiration; //투표 마감 기한
        string votingresult; //투표 결과
    }

    //@ Voter 정보  ( 투표자 주소 - NFT id - 투표자 정보 )
    mapping (address => mapping (uint256 => Voter)) public voters;
    //@ 제안자 정보 ( NFT id - 제안 순서 - 제안정보
    mapping ( uint256 => mapping(uint256 => Propose)) public proposers;
    //@ 제안 번호 저장 ( NFT id - 제안된번호 ) , 제안시마다 참조하여 카운트 함수 실행
    mapping (uint256 => uint256) _proposercounter;

    //@ 투표 권한 부여 (soul 가지고 있는 사람에게) 
    // (mSaddr: masterpiece SM 주소, pieceid: 조각번호, account: useraddr, proposernum: 권한 받고 싶은 제안 번호)  
    function getRight (address mSMaddr,uint256 pieceid,address account, uint256 proposernumber) public  returns(uint256) {
        require(masterpiece(mSMaddr).soulBalanceOf(pieceid,account) ==1,"Not owned Soul"); //soul을 소유했는지 확인
        require(block.timestamp > proposers[pieceid][proposernumber].expiration,"Expired time getting voting right" );
        voters[account][pieceid].weight = 1; //투표 권한 받음
        voters[account][pieceid].voted = false; // 투표 안한 상태로 세팅
        return voters[account][pieceid].weight ;
    }
    //@ 권한 부여 조회, 1 : 권한부여, 0 : 미 권한 부여
    // (account: useraddr , pieceid : 조각번호 )
    function isitRight(address account, uint256 pieceid)public view returns(uint256){
        return voters[account][pieceid].weight;
    }

    //@ 안건 제안 ( return : uri , 제안자 address )
    // (mSaddr: masterpiece SM 주소, pieceid: 조각번호, account: useraddr, suggestionuri : 제안 , duration : 투표 기간 )
    function suggestion (address mSMaddr, uint256 pieceid,address account, string memory suggestionuri, string memory suggestionstring, uint256 duration) public returns(uint256, uint256, uint256) {
        require(masterpiece(mSMaddr).soulBalanceOf(pieceid,account) ==1,"Not owned Soul"); //soul을 소유했는지 확인
        require(block.timestamp > masterpiece(mSMaddr)._getexpireddate(pieceid)+180,"Woops! Under staking");// staking 완료 + 보상 수령 전에 제안 불가
        proposers[pieceid][_proposercounter[pieceid]].soulowner = account;
        proposers[pieceid][_proposercounter[pieceid]].proposeuri = suggestionuri;
        proposers[pieceid][_proposercounter[pieceid]].agree =0; //초기값 설정
        proposers[pieceid][_proposercounter[pieceid]].disagree=0; //초기값 설정 
        //proposers[pieceid][_proposercounter[pieceid]].expiration= block.timestamp + 30;
        proposers[pieceid][_proposercounter[pieceid]].expiration= block.timestamp+duration;
        proposers[pieceid][_proposercounter[pieceid]].proposestring = suggestionstring;
        _proposercounter[pieceid]++; //제안 번호 증가
        masterpiece(mSMaddr)._changeStatusstaking(pieceid);

        return (_proposercounter[pieceid]-1,duration,proposers[pieceid][_proposercounter[pieceid]].expiration); // (제안번호 / duration/ expiredate ) 
    }

    //@ 투표 / 0 => agree / 1 => disagree
    // ( sMaddr: masterpiece 주소,  account: 제안자addr , pieceid: 조각id, proposedid: 제안번호, voted : 투표 , 0 or 1  )
    function voting (address mSMaddr, address account, uint256 pieceid, uint256 proposedid, uint256 voted ) public  returns(uint256){
        require(voters[account][pieceid].weight==1,"woops! No voting right" );
        require(voters[account][pieceid].voted == false,"Woops! Already voted");
        require(proposers[pieceid][proposedid].expiration >= block.timestamp , "Woops! Finish voting");
        require(proposers[pieceid][proposedid].soulowner != address(0),"Woop! Nobody suggested the proposal");
        require(voted == 1 || voted == 0 , "Woops! Please select 0 or 1");
        require(block.timestamp > masterpiece(mSMaddr)._getexpireddate(pieceid)+60,"Woops! Under staking");// staking 완료 + 보상수령 전 보팅도 불가
        voters[account][pieceid].voted =true;
        masterpiece(mSMaddr)._changeVotinghistory(pieceid,account);// 스테이킹 보상 수령을 할수 있게 변경

        if(voted == 1){
            proposers[pieceid][proposedid].agree ++;       
        }else {
            proposers[pieceid][proposedid].disagree ++;
        }
        return voted;               
    }

    //@ 투표 , 언제든지 조회 가능하지만, 제안이 있는 투표만 조회 가능
    // ( pieceid : 조각번호, proposedid : 제안번호 )
    function result (address mSMaddr, uint256 pieceid, uint256 proposedid) public returns(string memory) {
        require(proposers[pieceid][proposedid].soulowner != address(0),"Woop! Nobody suggested the proposal");
        require(block.timestamp > proposers[pieceid][proposedid].expiration , "Woops! Not finished voting");
        if(proposers[pieceid][proposedid].agree > proposers[pieceid][proposedid].disagree ){            
            proposers[pieceid][proposedid].votingresult = "agree";
            if(keccak256(abi.encodePacked(proposers[pieceid][proposedid].proposeuri)) == keccak256(abi.encodePacked("T"))){
                masterpiece(mSMaddr)._changestatus(pieceid,1); // Transfer
            } else if(keccak256(abi.encodePacked(proposers[pieceid][proposedid].proposeuri)) == keccak256(abi.encodePacked("S"))){
                masterpiece(mSMaddr)._changestatus(pieceid,2); // Staking
            }else {
                 masterpiece(mSMaddr)._changestatus(pieceid,0); // default
            }
        } else {
            proposers[pieceid][proposedid].votingresult = "disagree";
        }
        return proposers[pieceid][proposedid].votingresult;
    }
}

//##### ERC721 #####
contract erc721basic is ERC721, ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    constructor(string memory NFTName, string memory Symbol)  ERC721(NFTName, Symbol) {}
   
    //@ mint
    function mintNFT(address recipient, string memory tokenURI_) public onlyOwner returns(uint256){
        uint256 newItemId = _tokenIds.current();
        _mint(recipient,newItemId);
        _setTokenURI(newItemId, tokenURI_);
        _tokenIds.increment();

        return newItemId;
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) /*returns(uint256 burntTokenId)*/ {
        ERC721._burn(tokenId);
        ERC721URIStorage._burn(tokenId);
        //burntTokenId = tokenId;        

    }
    //@ burn
     function burn(uint256 tokenId) public returns(uint256 burntTokenId) {
        ERC721._burn(tokenId);
        ERC721URIStorage._burn(tokenId);
        burntTokenId = tokenId;        

    }
    function _test ()internal {
        
    }    
    //@ token URI 반환 
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(tokenId);
    } 
    //@ transfer
    function transfer ( address from, address to,uint256 id ) public {
        require(from ==_ownerOf(id),"Woops! not owned NFT" );
        require(from == msg.sender, "Woops! Owner should control");
        _transfer(from,to,id);
    }       
}
