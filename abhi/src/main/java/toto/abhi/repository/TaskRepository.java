package toto.abhi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import toto.abhi.modal.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
