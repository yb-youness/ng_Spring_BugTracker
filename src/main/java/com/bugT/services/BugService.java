package com.bugT.services;

import java.util.List;

import com.bugT.models.BugModel;

public interface BugService {
  List<BugModel> getAllBugs();
  BugModel getOneBug(int id);
  BugModel insertBug(BugModel bug);
  void updateBug(int id , BugModel u_Bug );
  void deleteBug(int id);
}
