package com.bugT.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "BugTable")
public class BugModel {
 @Id
 @GeneratedValue
 private int Id;
 
 private String BugName;
 private Date Bug_Ocurance;
 private String User_Name;
 

  


 public BugModel(int id, String bugName, Date bug_Ocurance, String user_Name) {
	Id = id;
	BugName = bugName;
	Bug_Ocurance = bug_Ocurance;
	User_Name = user_Name;
}

public BugModel() {}

public int getId() {
	return Id;
}

public void setId(int id) {
	Id = id;
}

public String getBugName() {
	return BugName;
}

public void setBugName(String bugName) {
	BugName = bugName;
}

public Date getBug_Ocurance() {
	return Bug_Ocurance;
}

public void setBug_Ocurance(Date bug_Ocurance) {
	Bug_Ocurance = bug_Ocurance;
}

public String getUser_Name() {
	return User_Name;
}

public void setUser_Name(String user_Name) {
	User_Name = user_Name;
}
 
 
}
