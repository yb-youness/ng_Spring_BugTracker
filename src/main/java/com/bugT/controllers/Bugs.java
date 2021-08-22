package com.bugT.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.bugT.models.BugModel;
import com.bugT.services.BugService;

@RestController
@CrossOrigin(origins = "http://localhost:4200") //! This For Cors In Angular 
@RequestMapping("/api/v1")
public class Bugs {
 
@Autowired	
private BugService bugServ;	
	
 @GetMapping("/getAll")	
 public  ResponseEntity<List<BugModel>> getAllBugs(){
    return new 
	        ResponseEntity<List<BugModel>>(bugServ.getAllBugs(),HttpStatus.OK) ;		 	
	}
  
 @GetMapping("/{id}")
 public ResponseEntity<BugModel> getOneBug(@PathVariable int id) {
        return  new ResponseEntity<BugModel>(bugServ.getOneBug(id),HttpStatus.OK);
 } 
 
 @PostMapping("/Add")
 public ResponseEntity<BugModel> insertBug(@RequestBody BugModel bug){
	 Date now = new Date();
	       bug.setBug_Ocurance(now);
	 return new ResponseEntity<BugModel>(bugServ.insertBug(bug),HttpStatus.CREATED);
 }
 
 @PutMapping("/{id}")
 public ResponseEntity<BugModel> updateBug(@PathVariable int id , @RequestBody BugModel bug) {
	    bugServ.updateBug(id, bug);
	 return new ResponseEntity<BugModel>(bugServ.getOneBug(id),HttpStatus.OK); 
 }
 
 @DeleteMapping("/{id}")
 public ResponseEntity<BugModel> deleteBug(@PathVariable int id) {
	bugServ.deleteBug(id);
	return new ResponseEntity<>(HttpStatus.NO_CONTENT);
 }

}
