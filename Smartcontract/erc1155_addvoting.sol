// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "hardhat/console.sol";

contract masterpiece {

    // @ tokenId 별로 주소 및 토큰 갯수 
     mapping(uint256 => mapping(address => uint256)) public _balances;
    // @ SBT 발행 시 조각 NFT  ID 에서 참여한 Address 에 uri 할당 ( sould drop 에서 사용 )
     mapping (uint256=>mapping(address=>string)) public _sbtUri;
    // @ 발행하는 tokenId 의 URI
     mapping(uint256 => string) private _tokenURIs;
    // @ 조각NFT 발행사 (발행사 만이 컨트롤 가능하게 설정 필요함 )
     mapping(uint256 => address) private _owners;

    //@ ERC1155 등록
    event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);
    //@ ERC721 등록
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    uint256 tokenId = 0;
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
         _counter();
         return true;
     }

      //@ Soul Drop / 1개씩 배분 / 중개인만 가능
     function souldrop(uint256 id, address to , string memory sbtUri) public onlyOwner() returns(string memory){
         require(_balances[id][owner] >=1, "No SBT balance on Owner");
         require(_balances[id][to] < 1,"Already get the SBT token");         
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
    //@ 화폐 이동 ( 추후, 권한부여에 대해서 생각해봐야함 )
    function erc20transfer(address recipient, uint amount) public {
        ERC20.transfer(recipient,amount);
    }
    //@ 계좌별 발란스 조회
    function erc20balance(address account) public view returns(uint256) {
        return ERC20.balanceOf(account);
    }    

    //@ 전체유통량 조회
    function erc20totoalsupply() public view returns (uint256){
        return ERC20.totalSupply();
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
      function _transfer( address sender, address recipient , uint256 amount) internal virtual {
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
        string proposeuri;
        uint256 agree; // 동의
        uint256 disagree; // 반대
        uint256 expiration; //투표 마감 기한
        string votingresult; //투표 결과
    }

    //@ Voter 정보  ( 투표자 주소 - NFT id - 투표자 정보 )
    mapping (address => mapping (uint256 => Voter)) public voters;
    //@ 제안자 정보 ( NFT id - 제안 순서 - 제안정보
    mapping ( uint256 => mapping(uint256 => Propose)) public proposers;

    uint256 proposerid = 0;

       //@ tokenId 증가
    function _counter () public returns(uint256) {
        proposerid = proposerid+1;   
        return proposerid;
    }

    //@ 투표 권한 부여 (soul 가지고 있는 사람에게) 
    function getRight (address mSMaddr,uint256 pieceid,address account) public  returns(uint256) {
        //require(masterpiece(mSMaddr).soulBalanceOf(id,account) ==1,"Not owned Soul");
        voters[account][pieceid].weight = 1; //투표 권한 받음
        voters[account][pieceid].voted = false; // 투표 안한 상태로 세팅
        //return masterpiece(mSMaddr).pieceowner(id);
        return voters[account][pieceid].weight;
    }
    //@ 권한 부여 조회, 1 : 권한부여, 0 : 미 권한 부여
    function isitRight(address account, uint256 pieceid)public view returns(uint256){
        return voters[account][pieceid].weight;
    }

    //@ 안건 제안 ( return : uri , 제안자 address )
    function suggestion (uint256 pieceid, string memory suggestionuri, address account/*,uint256 duration*/) public returns(uint256) {
        //require(masterpiece(mSMaddr).soulBalanceOf(id,account) ==1,"Not owned Soul");
        proposers[pieceid][proposerid].soulowner = account;
        proposers[pieceid][proposerid].proposeuri = suggestionuri;
        proposers[pieceid][proposerid].agree =0; //초기값 설정
        proposers[pieceid][proposerid].disagree=0; // 초기값 설정 
        proposers[pieceid][proposerid].expiration= block.timestamp+60;
        //proposers[pieceid][proposerid].expiration= block.timestamp+duration;          
        _counter();
        return proposerid-1;
    }

    //@ 투표 / 0 => agree / 1 => disagree
    function voting (address account, uint256 pieceid, uint256 proposedid, uint256 voted ) public  returns(uint256){
        require(voters[account][pieceid].weight==1,"woops! No voting right" );
        require(voters[account][pieceid].voted == false,"Woops! Already voted");
        require(proposers[pieceid][proposedid].expiration >= block.timestamp , "Woops! Finish voting");
        require(proposers[pieceid][proposedid].soulowner != address(0),"Woop! Nobody suggested the proposal");
        require(voted == 1 || voted == 0 , "Woops! Please select 0 or 1");
        voters[account][pieceid].voted =true;
        if(voted == 1){
            proposers[pieceid][proposerid].agree +=1;       
        }else {
            proposers[pieceid][proposerid].disagree += 1;
        }
        console.log("agree",proposers[pieceid][proposerid].agree);
        console.log("disagred",proposers[pieceid][proposerid].disagree);
        return voted;               
    }   
    //@ 투표  ## 잘동작 안함
    function result (uint256 pieceid, uint256 proposedid) public returns(string memory) {
        require(block.timestamp > proposers[pieceid][proposedid].expiration , "Woops! Not finished voting");
        console.log("blocktimestamp:", block.timestamp);
        console.log("settimestamp:", proposers[pieceid][proposedid].expiration);
        console.log("agree:",proposers[pieceid][proposedid].agree);
        console.log("disagree",proposers[pieceid][proposedid].disagree);
        if(proposers[pieceid][proposedid].agree > proposers[pieceid][proposedid].disagree ){
            proposers[pieceid][proposedid].votingresult = "agree";
        } else {
            proposers[pieceid][proposedid].votingresult = "disaree";
        }
        return proposers[pieceid][proposedid].votingresult;
    }
}
