package com.bezkoder.spring.security.postgresql.models;

import javax.persistence.*;

@Entity
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "salary")
    private Integer salary;

    @Column(name = "category")
    private String category;

    @Column(name = "description")
    private String description;

    public Job() {

    }

    public Job(String title, Integer salary, String category, String description) {
        this.title = title;
        this.salary = salary;
        this.category = category;
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Integer getSalary() {
        return salary;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Job [id=" + id + ", title=" + title + ", salary=" + salary + ", category=" + category  + ", desc=" + description + "]";
    }
}
