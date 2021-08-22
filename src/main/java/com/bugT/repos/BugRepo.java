package com.bugT.repos;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bugT.models.BugModel;

@Repository
public interface BugRepo extends CrudRepository<BugModel, Integer> {
   List<BugModel> findAll();
}
