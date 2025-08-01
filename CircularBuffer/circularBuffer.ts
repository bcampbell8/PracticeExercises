// Builds a circular buffer of fixed size n which takes a generic type.


class 

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
    }

    //Enqueue method, returns position in array value stored at.
    add(element: T): number{
        if (this.numberElements === 0){
            this.numberElements++;
            this.oldestElementIndex = Math.floor(this.bufferSize/2);
            this.circularArray[this.oldestElementIndex] = element;
            return this.oldestElementIndex;
        }
        let index: number = this.oldestElementIndex + this.numberElements;
        if (index >= this.bufferSize){
            index = index % this.bufferSize;
            if (index === this.oldestElementIndex){
                if (this.oldestElementIndex === this.bufferSize - 1){
                    this.oldestElementIndex = 0;
                }
                else{
                    this.oldestElementIndex++;
                }
                
            }
            else{
                this.numberElements++;
            }
            this.circularArray[index] = element;
        }
        else{
            this.numberElements++;
            this.circularArray[index] = element;
        }
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







