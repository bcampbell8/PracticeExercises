// Builds a circular buffer of fixed size n which takes a generic type.

class CircularBuffer{

    public bufferSize: number;
    public numberElements: number;
    public circularArray: Array<T | null>;
    public oldestElementIndex: number;

    constructor(n: number){
        //TODO: Need to implement error checking if n is less than 1.
        
        this.bufferSize = n;
        this.circularArray = new Array<T | null>(this.bufferSize);
        this.numberElements = 0;
        this.oldestElementIndex = Math.floor(this.bufferSize/2); 
        
    }

    //Enqueue method, returns position in array value stored at.
    add(element: T): number{
        //Let's break down what im doing:
        //1. Im creating an index on where to insert
        //2. This section is where I'm addressing whether or not a new value is being added or an old overwritten. Am i changing oldest index or numberElements?
        //2a. Im increasing the number of elements if not full
        //2ba. I'm changing the oldest element to 0 if it's currently the end of the array.
        //2bb. Otherwise i'm changing the oldest element index.
        //3. I'm writing in the new value

        //1. Create index
        let index: number = this.oldestElementIndex + this.numberElements;
        //1b. Address case where index is greater than buffer size.
        if (index >= this.bufferSize){ // Case where index is greater than the size of array, loop needs to occur
            index = index % this.bufferSize;
            
        }
        //2a. Increase number of elements if not full.
        if (this.numberElements < this.bufferSize) { // Case where there are less elements than buffer size
            this.numberElements++;
        }
        //2ba. Specific case where the element being overwritten is at the end of the buffer.
        else if (this.oldestElementIndex === this.bufferSize - 1){ //Check if oldest is at the end
            this.oldestElementIndex = 0;
        }
        //2bb. Changing oldest index to overwrite.
        else { 
            this.oldestElementIndex++;
        }
        
        //3. Write
        this.circularArray[index] = element;
        return index;
        
    }

    //Dequeue method, returns removed element
    remove(): T | null{
        if (this.numberElements === 0){
            return null;
        }
        let removedElement: T = this.circularArray[this.oldestElementIndex];
        this.circularArray[this.oldestElementIndex] = null;    
        this.numberElements--;
        if (this.oldestElementIndex === this.bufferSize - 1){
            this.oldestElementIndex = 0;
        }
        else{
            this.oldestElementIndex++;
        }

        return removedElement;

    }

    //Returns size
    size(): number{
        return this.numberElements;
    } 
}

// Stuff to test.
// let cb: CircularBuffer = new CircularBuffer(5);
// console.log("Addition:")
// for (let i: number = 0; i < 10; i++){
//     cb.add(i);
//     console.log(`Iteration ${i}: ${cb.circularArray} & Oldest Element: ${cb.oldestElementIndex}`);
// }
// console.log("Removal")
// for (let j:number = 0; j < 5; j++){
//     cb.remove()
//     console.log(`Iteration ${j}: ${cb.circularArray}`);
// }







