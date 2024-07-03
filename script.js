let inputForm=document.getElementById('task-name')
let submitBtn=document.getElementById('submit-btn')
let edit='';

let globalArr=[]
print();
submitBtn.addEventListener('click',(action)=>{
    action.preventDefault()
    console.log(inputForm.value)
    if(!(inputForm.value)){
        alert("Input is Requirred")
    }
    else{
        if(edit){
            globalArr=globalArr.map((item)=>{
                if(item.id==edit.id){
                    let newText=inputForm.value
                    return {...item,msg:newText}
                }else{
                    return item
                }
            }
        )
        edit='';
        }
        
        else{
           
            let arr={id:Math.trunc(Math.random()*1000),
                    msg:inputForm.value
            }
            globalArr.push(arr);
              
        }
        
        setItemHandler()
        print()
        inputForm.value='';
        
    }
})

function clearHandler(){
    globalArr=[]
    localStorage.clear()
    print()

}
function setItemHandler(){
    localStorage.setItem('To-do',JSON.stringify(globalArr))
}
function editItemHandler(id){
    let finddata=globalArr.find( item =>  item.id==id )
    edit=finddata
    
}
function getItemHandler(){
        return localStorage.getItem('To-do')?JSON.parse(localStorage.getItem('To-do')):[];
}
function deleteHandler(id){
    globalArr=globalArr.filter(item=> item.id!=id)
    setItemHandler()
    print()
}
function print(){
    let str=``;
    globalArr.forEach(function(item){
        str+=`<li class="list-group-item list-group-item-success mt-3">
                                    <span>${item.msg}</span>
                                    <button class="float-end" onclick="editItemHandler(${item.id})"><i class="fa-solid fa-square-pen"></i></button>
                                    <button class="float-end mx-3" onclick="deleteHandler(${item.id})"><i class="fa-solid fa-trash"></i></button>
                                </li>
                                `
    })
    document.getElementById('display').innerHTML=str;
}