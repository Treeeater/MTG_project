<?php
 
/* doublelist.class.php */
 
class ListNode {
 
    public $data;
    public $next;
    public $previous;
 
    function __construct($data) {
        $this->data = $data;
    }
 
    public function readNode() {
        return $this->data;
    }
 
}
 
 
class DoublyLinkedList {
 
    private $_firstNode;
    private $_lastNode;
    private $_count;

    function __construct() {
        $this->_firstNode = NULL;
        $this->_lastNode = NULL;
        $this->_count = 0;
    }
 
    public function isEmpty() {
        return ($this->_firstNode == NULL);
    }
 
	public function firstNode() {
		return $this->_firstNode;
	}
	
    public function insertFirst($data) {
        $newLink = new ListNode($data);
 
        if($this->isEmpty()) {
            $this->_lastNode = $newLink;
        } else {
            $this->_firstNode->previous = $newLink;
        }
 
        $newLink->next = $this->_firstNode;
        $this->_firstNode = $newLink;
        $this->_count++;
    }
 
 
    public function insertLast($data) {
        $newLink = new ListNode($data);
 
        if($this->isEmpty()) {
            $this->_firstNode = $newLink;
        } else {
            $this->_lastNode->next = $newLink;
        }
 
        $newLink->previous = $this->_lastNode;
        $this->_lastNode = $newLink;
        $this->_count++;
    }
 
 
    public function insertAfter($key, $data) {
        $current = $this->_firstNode;
 
        while($current->data != $key) {
            $current = $current->next;
 
            if($current == NULL)
                return false;
        }
 
        $newLink = new ListNode($data);
 
        if($current == $this->_lastNode) {
            $newLink->next = NULL;
            $this->_lastNode = $newLink;
        } else {
            $newLink->next = $current->next;
            $current->next->previous = $newLink;
        }
 
        $newLink->previous = $current;
        $current->next = $newLink;
        $this->_count++;
 
        return true;
    }
 
 
    public function deleteFirstNode() {
 
        $temp = $this->_firstNode;
 
        if($this->_firstNode->next == NULL) {
            $this->_lastNode = NULL;
        } else {
            $this->_firstNode->next->previous = NULL;
        }
 
        $this->_firstNode = $this->_firstNode->next;
        $this->_count--;
        return $temp;
    }
 
 
    public function deleteLastNode() {
 
        $temp = $this->_lastNode;
 
        if($this->_firstNode->next == NULL) {
            $this->firtNode = NULL;
        } else {
            $this->_lastNode->previous->next = NULL;
        }
 
        $this->_lastNode = $this->_lastNode->previous;
        $this->_count--;
        return $temp;
    }
 
 
    public function deleteNode($key) {
 
        $current = $this->_firstNode;
		
		if ($this->_count <= 0) return null;
		
        while($current->data != $key) {
            $current = $current->next;
            if($current == NULL)
                return null;
        }
 
        if($current == $this->_firstNode) {
            $this->_firstNode = $current->next;
        } else {
            $current->previous->next = $current->next;
        }
 
        if($current == $this->_lastNode) {
            $this->_lastNode = $current->previous;
        } else {
            $current->next->previous = $current->previous;
        }
 
        $this->_count--;
        return $current;
    }
 
 
    public function displayForward() {
 
        $current = $this->_firstNode;
 
        while($current != NULL) {
            echo $current->readNode() . " ";
            $current = $current->next;
        }
    }
 
    public function existNode($key) {
 
        $current = $this->_firstNode;
 
        while($current != NULL) {
            if ($key == $current->data) {return true;}
            $current = $current->next;
        }
		
		return false;
    }
	
    public function displayBackward() {
 
        $current = $this->_lastNode;
 
        while($current != NULL) {
            echo $current->readNode() . " ";
            $current = $current->previous;
        }
    }
 
    public function totalNodes() {
        return $this->_count;
    }
 
}
 
 
?>