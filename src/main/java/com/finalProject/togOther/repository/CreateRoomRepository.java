package com.finalProject.togOther.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.finalProject.togOther.domain.CreateRoom;

public interface CreateRoomRepository extends JpaRepository<CreateRoom, Long> {

    @Modifying
    @Query("UPDATE CreateRoom e SET e.toMainSeq = :afterSeq WHERE e.toMainSeq = :beforeSeq")
    void updateBytoMainSeq(@Param("beforeSeq") int beforeSeq,@Param("afterSeq") int afterSeq);
    
    @Modifying
    @Query("UPDATE CreateRoom e SET e.entrySeq = :entry WHERE e.id = :chatSeq")
    void updateByEntry(@Param("chatSeq") int chatSeq,@Param("entry") String entry);
    
    void deleteBytoMainSeq(int toMainSeq);
    
    CreateRoom findBytoMainSeq(int toMainSeq);
    
}