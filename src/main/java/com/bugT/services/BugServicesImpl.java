package com.bugT.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugT.models.BugModel;
import com.bugT.repos.BugRepo;

@Service
public class BugServicesImpl implements BugService {
    @Autowired
	private BugRepo _bugRepo;
	
	@Override
	public List<BugModel> getAllBugs() {
		return _bugRepo.findAll();
	}

	@Override
	public BugModel getOneBug(int id) {
		return _bugRepo.findById(id).get();
	}

	@Override
	public BugModel insertBug(BugModel bug) {
		return _bugRepo.save(bug);
	}

	@Override
	public void updateBug(int id, BugModel u_Bug) {
		u_Bug.setId(id);
		_bugRepo.save(u_Bug);
	}

	@Override
	public void deleteBug(int id) {
		_bugRepo.deleteById(id);
	}
       
	
}
