package com.thegreatestteam.backend.service;

import com.thegreatestteam.backend.model.Staff;
import com.thegreatestteam.backend.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StaffService {

    private final StaffRepository staffRepository;

    @Autowired
    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    public Staff getAllStaffWithId(String Id){
        return staffRepository.findStaffById(Id);
    }

    /**
     * Add staff member to the databse
     * @param staff
     * @since 1.0
     */
    public void addStaff(Staff staff){
        staffRepository.save(staff);
    }
}
