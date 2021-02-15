//function that takes in an array and a Number, and returns to me the index of that number in that array

const findNumberInArray = (arr,numToFind) => {
    const index =  arr.findIndex(number => number === numToFind)
    console.log(index)
    return index
    
}
const foundIndex = findNumberInArray([1,3,5], 15)

const areaOfRectangle = (length, width) => {
    const calculateArea = length * width 
    console.log(calculateArea)
    return calculateArea
}
const area = areaOfRectangle(4,4)

const findNumber = (arr,num) => {
   const  numbersGreaterThanNum = arr.filter( number => number > num)
}