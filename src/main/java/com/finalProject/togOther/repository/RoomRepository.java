package com.finalProject.togOther.repository;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Repository;

import com.finalProject.togOther.domain.CreateRoom;
import com.finalProject.togOther.models.Room;

@Repository
public class RoomRepository {
    private final Map<Long, Room> rooms;

    public RoomRepository() {
    	this.rooms = new HashMap<>();

        // Example room creation (adjust as needed)
        Room room = Room.create("RoomName", "RoomMaster", 123L, "AdditionalInfo");
        rooms.put(room.getId(), room);
    }

    public Room room(Long id) {
        return rooms.get(id);
    }

	public void save(CreateRoom createRoom) {
		// TODO Auto-generated method stub
		
	}
}
