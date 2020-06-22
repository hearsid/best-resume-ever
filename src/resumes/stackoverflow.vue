<template>
<div id="resume">
    <header id="header" class="clear">
        <div v-if="basics.picture">
            <img class="image" v-bind:src="basics.picture" v-bind:alt="basics.name" />
            <div class="middle">
                <h1 class="name">{{basics.name}}</h1>
                <h2 class="label">{{basics.label}}</h2>
            </div>
        </div>
        <div v-else>
            <div>
                <h1 class="name">{{basics.name}}</h1>
                <h2 class="label">{{basics.label}}</h2>
            </div>
        </div>

        <div v-if="basics.location">
            <span class="location">
                <span v-if="basics.address">
                    <span class="address">{{basics.address}},</span>
                </span>
                <span v-if="basics.location.postalCode">
                    <span class="postalCode">{{basics.location.postalCode}},</span>
                </span>
                <span v-if="basics.location.city">
                    <span class="city">{{basics.location.city}},</span>
                </span>
                <span v-if="basics.location.region">
                    <span class="region">{{basics.location.region}}</span>
                </span>
                <span v-if="basics.location.countryCode">
                    <span class="countryCode">{{basics.location.countryCode}}</span>
                </span>
            </span>
        </div>

        <div id="contact">
            <div v-if="basics.website">
                <div class="website">
                    <span class="fas fa-external-link-alt"></span>
                    <a target="_blank" v-bind:href="basics.website">{{basics.website}}</a>
                </div>
            </div>
            <div v-if="basics.email">
                <div class="email">
                    <span class="fa fa-envelope"></span>
                    <a v-bind:href="'mailto:'+basics.email">{{basics.email}}</a>
                </div>
            </div>
            <div v-if="basics.phone">
                <div class="phone">
                    <span class="fas fa-mobile-alt"></span>
                    <a v-bind:href="'tel:'+basics.phone">{{basics.phone}}</a>
                </div>
            </div>
        </div>

        <div v-if="basics.profiles && basics.profiles.length">
            <div id="profiles">
                <span v-for="(network, index) in basics.profiles" :key="index">
                    <div class="item">
                        <span v-if="network">
                            <span class="username network-block" v-if="network.url">
                                <!-- <span v-bind:class="'fa fa-'+network.network.toLowerCase()"></span> -->
                                <img style="width: 15px" v-bind:src="'./assets/social-icons/'+network.network.toLowerCase()+'.png'" />
                                        <a target="_blank" v-bind:href="network.url">{{network.username}}</a>
                                <!-- <span v-else>
                                    <span>{{network.username}}</span>
                                </span> -->
                            </span>
                        </span>
                    </div>
                </span>
            </div>
        </div>
    </header>
    <div class="timeline">
        <vue-horizontal-timeline :items="data()" title-centered="true" content-centered="true"
            timeline-padding="0" timeline-background="#ffffff" clickable="false" />
    </div>

    <div v-if="skills && skills.length">
        <section class="section">
            <header>
                <h2 class="section-title">Skills</h2>
            </header>
            <section id="skills">
                <span v-for="(skill, index) in skills" :key="index">
                    <div class="item">
                        <div v-if="skill.name">
                            <h3 class="name">{{skill.name}}</h3>
                        </div>
                        <div v-if="skill.level">
                            <div v-bind:class="'level '+skill.level.toLowerCase()">
                                <div v-if="skill.levelDisplay">
                                    <em>{{skill.levelDisplay}}</em>
                                </div>
                                <div v-else>
                                    <em>{{skill.level}}</em>
                                </div>
                                <div class="bar"></div>
                            </div>
                        </div>
                        <div v-if="skill.keywords && skill.keywords.length">
                            <ul class="keywords">
                                <span v-for="(entity, index) in skill.keywords" :key="index">
                                    <li>{{entity}}</li>
                                </span>
                            </ul>
                        </div>
                    </div>
                </span>
            </section>
        </section>
    </div>

    <div v-if="basics.summary">
        <section class="section">
            <section class="main-summary">
                <div>{{basics.summary}}</div>
            </section>
        </section>
    </div>

    <div v-if="work && work.length">
        <section class="section">
            <header>
                <h2 class="section-title">
                    Work Experience
                    <span class="item-count">({{work.length}})</span>
                </h2>
            </header>

            <section id="work">
                <div v-for="(company, index) in work" :key="index">
                    <section class="work-item">
                        <div v-if="company">
                            <div v-if="company.summary">
                                <div v-if="index === 0">
                                    <input v-bind:id="'work-item-'+index" type="checkbox" class="toggle-item" checked="checked" />
                                </div>
                                <div v-else>
                                    <input v-bind:id="'work-item-'+index" type="checkbox" class="toggle-item" />
                                </div>
                                <label v-bind:for="'work-item-'+index"></label>
                            </div>
                            <header class="clear work-header">
                                <span v-if="company.position">
                                    <div class="position">{{company.position}}</div>
                                </span>
                                <div class="company">{{company.company}}</div>
                                <span class="date">
                                    <span v-if="company.startDate">
                                        <span class="startDate">{{getHumanDate(company.startDate)}}</span>
                                    </span>
                                    <span v-if="company.endDate">
                                        <span class="endDate">- {{getHumanDate(company.endDate)}}</span>
                                    </span>
                                    <span v-else>
                                        <span class="endDate">- Current</span>
                                    </span>
                                </span>
                            </header>
                        </div>

                        <div v-if="company.location">
                            <span class="location">
                                <span class="fas fa-map-marker-alt"></span>
                                <div v-if="company.city">
                                    <span class="city">{{company.city}},</span>
                                </div>
                                <div v-if="company.countryCode">
                                    <span class="countryCode">({{company.countryCode}})</span>
                                </div>
                                <div v-if="company.region">
                                    <span class="region">{{company.region}}</span>
                                </div>
                            </span>
                        </div>
                        <div v-if="company.website">
                            <span class="website">
                                <a target="_blank" v-bind:href="company.website">{{company.website}}</a>
                            </span>
                        </div>
                        <div v-if="company.keywords && company.keywords.length">
                            <ul class="keywords">
                                <div v-for="(entity, index) in company.keywords" :key="index">
                                    <li>{{entity}}</li>
                                </div>
                            </ul>
                        </div>
                        <div class="item" id="work-item">
                            <div v-if="company.summary">
                                <div class="summary">{{company.summary}}</div>
                            </div>
                            <div v-if="company.highlights && company.highlights.length">
                                <ul class="highlights">
                                    <div v-for="(entity, index) in company.highlights" :key="index">
                                        <li>{{entity}}</li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </section>
    </div>

    <div v-if="projects && projects.length">
        <div class="section">
            <header>
                <h2 class="section-title">
                    Projects
                    <span class="item-count">({{projects.length}})</span>
                </h2>
            </header>
            <div id="projects">
                <div v-for="(project, index) in projects" :key="index">
                    <section class="project-item">
                        <div v-if="project.summary">
                            <div v-if="index === 0">
                                <input v-bind:id="'project-item-'+index" type="checkbox" class="toggle-item" checked="checked" />
                            </div>
                            <div v-else>
                                <input v-bind:id="'project-item-'+index" type="checkbox" class="toggle-item" />
                            </div>
                            <label v-bind:for="'project-item-'+index"></label>
                        </div>

                        <div v-if="name">
                            <header class="clear">
                                <div v-if="name">
                                    <div class="position">{{project.name}}</div>
                                </div>
                                <div v-if=" startDate">
                                    <div class="date">
                                        <span class="startDate">{{getHumanDate(project.startDate)}}</span>
                                        <span v-if="endDate">
                                            <span class="endDate">- {{getHumanDate(project.endDate)}}</span>
                                        </span>
                                        <span v-else>
                                            <span class="endDate">- Current</span>
                                        </span>
                                    </div>
                                </div>
                            </header>
                        </div>
                        <div v-if="project.location">
                            <span class="location">
                                <span class="fas fa-map-marker-alt"></span>
                                <div v-if="project.city">
                                    <span class="city">{{project.city}},</span>
                                </div>
                                <div v-if="project.countryCode">
                                    <span class="countryCode">({{project.countryCode}})</span>
                                </div>
                                <div v-if="project.region">
                                    <span class="region">{{project.region}}</span>
                                </div>
                            </span>
                        </div>
                        <div v-if="project.url">
                            <span class="website">
                                <a target="_blank" v-bind:href="project.url">{{project.url}}</a>
                            </span>
                        </div>
                        <div v-if="project.keywords && project.keywords.length">
                            <ul class="keywords">
                                <div v-for="(entity, index) in project.keywords" :key="index">
                                    <li>{{entity}}</li>
                                </div>
                            </ul>
                        </div>
                        <div class="item">
                            <div v-if="project.summary">
                                <div class="summary">{{project.summary}}</div>
                            </div>
                            <div v-if="project.highlights && project.highlights.length">
                                <ul class="highlights">
                                    <div v-for="(entity, index) in project.highlights" :key="index">
                                        <li>{{entity}}</li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>

    <div v-if="volunteer && volunteer.length">
        <section class="section">
            <header>
                <h2 class="section-title">Volunteer</h2>
            </header>
            <section id="volunteer">
                <span v-for="(activity, index) in volunteer" :key="index">
                    <section class="volunteer-item">
                        <span v-if="activity.organization">
                            <div v-if="activity.summary">
                                <div v-if="index === 0">
                                    <input v-bind:id="'volunteer-item-'+index" type="checkbox" class="toggle-item" checked="checked" />
                                </div>
                                <div v-else>
                                    <input v-bind:id="'volunteer-item-'+index" type="checkbox" class="toggle-item" />
                                </div>
                                <label v-bind:for="'volunteer-item-'+index"></label>
                            </div>

                            <header class="clear volunteer-header">
                                <div class="header-left">
                                    <span v-if="activity.position">
                                        <span class="position">{{activity.position}}</span>
                                    </span>
                                    <span class="organization">{{activity.organization}}</span>
                                </div>
                                <div class="date">
                                    <span v-if="activity.startDate">
                                        <span class="startDate">{{getHumanDate(activity.startDate)}}</span>
                                    </span>
                                    <span v-if="activity.endDate">
                                        <span class="endDate">- {{getHumanDate(activity.endDate)}}</span>
                                    </span>
                                    <span v-else>
                                        <span class="endDate">- Current</span>
                                    </span>
                                </div>
                            </header>
                        </span>
                        <div v-if="activity.website">
                            <div class="website">
                                <a target="_blank" v-bind:href="activity.website">{{activity.website}}</a>
                            </div>
                        </div>
                        <div v-if="activity.location">
                            <span class="location">
                                <span class="fas fa-map-marker-alt"></span>
                                <div v-if="activity.city">
                                    <span class="city">{{activity.city}},</span>
                                </div>
                                <div v-if="activity.countryCode">
                                    <span class="countryCode">({{activity.countryCode}})</span>
                                </div>
                                <div v-if="activity.region">
                                    <span class="region">{{activity.region}}</span>
                                </div>
                            </span>
                        </div>
                        <div v-if="activity.keywords && activity.keywords.length">
                            <ul class="keywords">
                                <div v-for="(entity, index) in activity.keywords" :key="index">
                                    <li>{{entity}}</li>
                                </div>
                            </ul>
                        </div>
                        <div class="item">
                            <div v-if="activity.summary">
                                <div class="summary">{{activity.summary}}</div>
                            </div>
                            <div v-if="activity.highlights && activity.highlights.length">
                                <ul class="highlights">
                                    <div v-for="(entity, index) in activity.highlights" :key="index">
                                        <li>{{entity}}</li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </section>
                </span>
            </section>
        </section>
    </div>

    <div v-if="education && education.length">
        <section class="section">
            <header>
                <h2 class="section-title">
                    Education
                    <span class="item-count">({{education.length}})</span>
                </h2>
            </header>

            <section id="education">
                <div v-for="(study, index) in education" :key="index">
                    <section class="education-item">
                        <div v-if="study.summary">
                            <div v-if="index === 0">
                                <input v-bind:id="'education-item-'+index" type="checkbox" class="toggle-item" checked="checked" />
                            </div>
                            <div v-else>
                                <input v-bind:id="'education-item-'+index" type="checkbox" class="toggle-item" />
                            </div>
                            <label v-bind:for="'education-item-'+index"></label>
                        </div>
                        <header class="clear education-header">
                            <div class="header-left">
                                <span v-if="study.studyType">
                                    <span class="studyType">{{study.studyType}}</span>
                                </span>
                                <span v-if="study.area">
                                    <span class="area">{{study.area}}</span>
                                </span>
                                <span v-if="study.institution">
                                    <span class="institution">{{study.institution}}</span>
                                </span>
                            </div>
                            <div class="date">
                                <span v-if="study.startDate">
                                    <span class="startDate">{{getHumanDate(study.startDate)}}</span>
                                </span>
                                <span v-if="study.endDate">
                                    <span class="endDate">- {{getHumanDate(study.endDate)}}</span>
                                </span>
                                <span v-else>
                                    <span class="endDate">- Current</span>
                                </span>
                            </div>
                        </header>

                        <div v-if="study.location">
                            <span class="location">
                                <span class="fas fa-map-marker-alt"></span>
                                <div v-if="city">
                                    <span class="city">{{study.city}},</span>
                                </div>
                                <div v-if="study.countryCode">
                                    <span class="countryCode">({{study.countryCode}})</span>
                                </div>
                                <div v-if="study.region">
                                    <span class="region">{{study.region}}</span>
                                </div>
                            </span>
                        </div>

                        <div v-if="study.courses && study.courses.length">
                            <ul class="courses">
                                <div v-for="(entity, index) in study.courses" :key="index">
                                    <li>{{entity}}</li>
                                </div>
                            </ul>
                        </div>

                        <div class="item">
                            <div v-if="study.gpa">
                                <div class="gpa">
                                    <strong>Grade:</strong>
                                    <span>{{study.gpa}}</span>
                                </div>
                            </div>
                            <div v-if="study.summary">
                                <div class="summary">{{study.summary}}</div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </section>
    </div>

    <div v-if="awards && awards.length">
        <section class="section">
            <header>
                <h2 class="section-title">Awards</h2>
            </header>
            <section id="awards">
                <div v-for="(award, index) in awards" :key="index">
                    <section class="award-item">
                        <div v-if="award.summary">
                            <div v-if="index === 0">
                                <input v-bind:id="'award-item-'+index" type="checkbox" class="toggle-item" checked="checked" />
                            </div>
                            <div v-else>
                                <input v-bind:id="'award-item-'+index" type="checkbox" class="toggle-item" />
                            </div>
                            <label v-bind:for="'award-item-'+index"></label>
                        </div>

                        <header class="clear awards-header">
                            <div class="header-left">
                                <span v-if="award.title">
                                    <span class="title">{{award.title}}</span>
                                </span>
                                <span v-if="award.awarder">
                                    <span class="awarder">{{award.awarder}}</span>
                                </span>
                            </div>
                            <span v-if="award.date">
                                <div class="date">{{getHumanDate(award.date)}}</div>
                            </span>
                        </header>

                        <div class="item">
                            <div v-if="award.summary">
                                <div class="summary">{{award.summary}}</div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </section>
    </div>

    <div v-if="publications && publications.length">
        <section class="section">
            <header>
                <h2 class="section-title">Publications</h2>
            </header>
            <section id="publications">
                <div v-for="(publication, index) in publications" :key="index">
                    <section class="publication-item">
                        <div v-if="summary">
                            <div v-if="index === 0">
                                <input v-bind:id="'publication-item-'+index" type="checkbox" class="toggle-item" checked="checked" />
                            </div>
                            <div v-else>
                                <input v-bind:id="'publication-item-'+index" type="checkbox" class="toggle-item" />
                            </div>
                            <label v-bind:for="'publication-item-'+index"></label>
                        </div>

                        <header class="clear">
                            <div class="header-left">
                                <span v-if="publication.name">
                                    <span class="name">
                                        <span v-if="publication.website">
                                            <span class="website">
                                                <a target="_blank" v-bind:href="publication.website">{{publication.name}}</a>
                                            </span>
                                        </span>
                                        <span v-else>{{publication.name}}</span>
                                    </span>
                                </span>
                                <span v-if="publication.publisher">
                                    <span class="publisher">in {{publication.publisher}}</span>
                                </span>
                            </div>
                            <span v-if="publication.releaseDate">
                                <span class="date">{{publication.releaseDate}}</span>
                            </span>
                        </header>
                        <div v-if="publication.keywords && publication.keywords.length">
                            <ul class="keywords">
                                <div v-for="(entity, index) in keywords" :key="index">
                                    <li>{{entity}}</li>
                                </div>
                            </ul>
                        </div>

                        <div class="item">
                            <div v-if="publication.summary">
                                <div class="summary">{{publication.summary}}</div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </section>
    </div>

    <div v-if="achievements && achievements.length">
        <section class="section">
            <header>
                <h2 class="section-title">Achievements</h2>
            </header>
            <section id="volunteer">
                <div v-for="(entity, index) in achievements" :key="index">
                    <section class="volunteer-item">{{entity}}</section>
                </div>
            </section>
        </section>
    </div>

    <div v-if="openSourceContributions && openSourceContributions.length">
        <section class="section">
            <header>
                <h2 class="section-title">
                    Open source contributions
                    <span class="item-count">({{openSourceContributions.length}})</span>
                </h2>
            </header>

            <section id="work">
                <span v-for="(contribution, index) in openSourceContributions" :key="index">
                    <section class="work-item">
                        <span class="open-source-header">
                            <span v-if="contribution.organization">
                                <div class="position">{{contribution.organization}}</div>
                            </span>

                            <span v-if="contribution.website">
                                <span class="website">
                                    <a target="_blank" v-bind:href="contribution.website">{{contribution.website}}</a>
                                </span>
                            </span>
                        </span>
                        <div class="item" id="work-item">
                            <span v-if="contribution.summary">
                                <span class="summary">{{contribution.summary}}</span>
                            </span>
                        </div>
                    </section>
                </span>
            </section>
        </section>
    </div>

    <div v-if="languages && languages.length">
        <section class="section">
            <header>
                <h2 class="section-title">Languages</h2>
            </header>
            <section id="languages">
                <span v-for="(language, index) in languages" :key="index">
                    <div class="display">
                        <span v-if="language.language">
                            <h3 class="language">{{language.language}}</h3>
                        </span>
                        <div class="item">
                            <span v-if="language.fluency">
                                <div v-bind:class="'level fluency '+language.fluency.toLowerCase()">
                                    <div v-if="language.fluencyDisplay">
                                        <em>{{language.fluencyDisplay}}</em>
                                    </div>
                                    <div v-else>
                                        <em>{{language.fluency}}</em>
                                    </div>
                                    <div class="bar"></div>
                                </div>
                            </span>
                        </div>
                    </div>
                </span>
            </section>
        </section>
    </div>

    <div v-if="interests && interests.length">
        <section class="section">
            <header>
                <h2 class="section-title">Interests</h2>
            </header>
            <section id="interests">
                <span v-for="(interest, index) in interests" :key="index">
                    <div class="item">
                        <span v-if="interest.name">
                            <h3 class="name">{{interest.name}}</h3>
                        </span>
                        <span v-if="interest.keywords && interest.keywords.length">
                            <ul class="keywords">
                                <span v-for="(entity, index) in interest.keywords" :key="index">
                                    <li>{{entity}}</li>
                                </span>
                            </ul>
                        </span>
                        <div v-if="interest.summary">
                            <div class="summary">{{interest.summary}}</div>
                        </div>
                    </div>
                </span>
            </section>
        </section>
    </div>

    <div v-if="references && references.length" :key="index">
        <section class="section">
            <header>
                <h2 class="section-title">References</h2>
            </header>
            <section id="references">
                <div v-for="(entity, index) in references" :key="index">
                    <div class="item">
                        <div v-if="reference">
                            <blockquote class="reference">&#8220;&#32;{{reference}}&#32;&#8221;</blockquote>
                        </div>
                        <div v-if="name">
                            <div class="name">{{name}}</div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </div>
</div>
</template>

<script>
import Vue from 'vue';
import {
    getVueOptions
} from './options';
import moment from 'moment';

const name = 'stackoverflow';
const options = getVueOptions(name, true);
// interface ICard {
//     title: string;
//     content: string
// }

// inteface IWorkItem {
//     company: string;
//     endDate: string;
//     highlights: Array<string>; 
//     position: string;
//     startDate: string;
//     summary: string;
// }
function getTimelineCard(company) {
    const startDate = new Date(company.startDate);
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric',
        month: 'short',
        day: '2-digit' });
    const [{ value: month }, , , , { value: year }] = dateTimeFormat.formatToParts(startDate);
    const formattedDate = month + ', ' + year;
    const content = `${company.company} [${company.position}]`;
    return { title: formattedDate,
        content };
}

function getEducationTimeline(study) {
    const startDate = new Date(study.startDate);
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric',
        month: 'short',
        day: '2-digit' });
    const [{ value: month }, , , , { value: year }] = dateTimeFormat.formatToParts(startDate);
    const formattedDate = month + ', ' + year;
    const content = `Started ${study.studyType}`;
    return { title: formattedDate,
        content };
}
options.methods = {
    getHumanDate: date => {
        return moment(date, 'YYYY-MM-DD').format('LL');
    },
    data: function () {
        const timelineItems = [];

        this.work.forEach((work) => {
            timelineItems.unshift(getTimelineCard(work));
        });

        this.education.forEach((study) => {
            timelineItems.unshift(getEducationTimeline(study));
        });

        return timelineItems;
    }
};
export default Vue.component(name, options);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
/********************************************
* 	reset from
* 	http://meyerweb.com/eric/tools/css/reset/
*******************************************/
html {
  -webkit-print-color-adjust: exact;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
    display: block;
}

body {
    line-height: 1;
    font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
}

ol,
ul {
    list-style: none;
}

blockquote,
q {
    quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
    content: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

/****************
*	COMMONS 
****************/

body,
html {
    font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-size: 13px;
    color: #40484f;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.46153846;
    text-align: left;
    -webkit-text-size-adjust: 100%;
}

p {
    display: block;
}

a {
    /*color: #0095ff;*/
    color: #0095f2;
    text-decoration: none;
}

a:hover {
    color: #0c65a5;
    text-decoration: underline;
}

li {
    list-style-type: square;
    list-style-position: outside;
    margin-left: 1.3em;
}

h1 {
    font-size: 2rem;
}

h2 {
    font-size: 1.67rem;
}

h3 {
    font-size: 1.27rem;
}

em {
    color: #757575;
}

blockquote {
    margin-bottom: 1em;
}

strong {
    font-weight: 700;
}

/* main container */

#resume {
    padding: 1.5rem;
}

/* every section wrapper */

.section {
    margin-bottom: 1rem;
}

section .location {
    margin-right: 0.5em;
    color: #606d76;
    font-weight: 700;
}

#contact {
    margin-top: 0.5rem;
}

#profiles .item {
    padding-right: 15px;
    display: inline-block;

    .network-block {
        display: flex;
        align-items: center;

        &>img {
            padding-right: 7px;
        }
    }
}

.work-header,
.volunteer-header,
.education-header,
.awards-header {
    font-size: 18px;
    padding: 10px;
    padding-left: 0px;

    .startDate,
    .endDate,
    .date {
        font-weight: 200 !important;
    }
}

.open-source-header {
    font-size: 14px;
    display: inline-block;
    padding: 10px 0 3px 0;
}

#header>#profiles,
#header>#contact,
#skills,
#languages,
#interests {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
}

#header>div {
    line-height: 1.5;
}

#header>div>div {
    margin-right: 1.2em;
}

#header h1.name {
    font-size: 2.8rem;
    font-weight: 100;
    line-height: 100%;
}

#header h2.label {
    color: #202931;
    font-size: 1.47rem;
    font-weight: 300;
}

#header .image {
    width: 11em;
    float: right;
    border-radius: 4px;
}

.main-summary {
    background: #f1f8ff;
    padding: 1.2em 1em;
    margin-top: 1rem;
}

.main-summary p {
    margin: 0;
}

.section-title {
    display: inline-block;
    background: #fff;
    padding: 0 1em 0.3em 0;
    color: #ff6d1f;
    text-transform: uppercase;
    font-weight: 600;
    border: none;
    font-size: 0.9rem;
}

.section>header {
    position: relative;
}

.fa {
    margin-right: 0.25em;
}

.section>header::after {
    position: absolute;
    left: 0;
    top: 0.7em;
    height: 1px;
    background: #ccc;
    content: "";
    width: 100%;
    z-index: -100;
    display: block;
}

.section.main-summary>section {
    margin: 0;
}

.section>section>header {
    font-size: 1.38rem;
    position: relative;
    margin-top: 0.7em;
}

.section>section>header:first-of-type {
    margin: 0;
}

.section>section>header .space-left {
    position: absolute;
    left: -1.56rem;
    top: 5px;
    color: #aaa;
    line-height: 1;
    opacity: 0;
}

.position,
.company,
.organization,
.institution,
.date,
.area,
.studyType,
.title,
.awarder {
    display: inline;
}

.position,
.studyType,
.area,
.title,
.language,
.name {
    font-weight: 500;
}

.company::before,
.institution::before,
.organization::before,
.awarder::before {
    content: "at ";
}

.company,
.institution,
.organization,
.awarder {
    color: #606d76;
    font-weight: 400;
}

.section header .date {
    display: block;
    font-size: 1rem;
    padding: 0.1em 0;
    color: #606d76;
    font-weight: 400;
}

.keywords,
.courses {
    margin: 0.5em 0;
}

.keywords li,
.courses li {
    display: inline-block;
    margin: 2px 2px 2px 0;
    padding: 4px 5px 5px;
    font-size: 0.7rem;
    line-height: 1;
    color: #3e6d8e;
    background-color: #dfeaf1;
    border: 0 solid #dfeaf1;
    white-space: nowrap;
}

.keywords li:hover,
.courses li:hover {
    background: #dfeaf0;
}

.highlights {
    margin: 1em 0 0 0;
}

.highlights>li>p {
    margin-bottom: 0.5em;
}

.item {
    overflow: hidden;
}

.gpa {
    clear: both;
    padding-bottom: 0.5em;
}

.fa.social {
    font-size: 1.1em;
}

/* Social Media Brand Colors */

.google-plus {
    color: #dd4b39;
}

.tumblr {
    color: #32506d;
}

.foursquare {
    color: #0072b1;
}

.facebook {
    color: #3b5998;
}

.linkedin {
    color: #007bb6;
}

.pinterest {
    color: #cb2027;
}

.dribbble {
    color: #ea4c89;
}

.instagram {
    color: #517fa4;
}

.twitter {
    color: #00aced;
}

.soundcloud {
    color: #ff3a00;
}

.wordpress {
    color: #21759b;
}

.youtube {
    color: #bb0000;
}

.github {
    color: #171515;
}

.stack-overflow {
    color: #828386;
    position: relative;
}

.flickr {
    color: #ff0084;
}

.reddit {
    color: #ff4500;
}

.hacker-news {
    color: #ff6600;
}

.stack-overflow::after {
    position: absolute;
    left: 0;
    content: "\f16c";
    color: #f68a1f;
    overflow: hidden;
    height: 100%;
}

.telegram {
    color: #2291c3;
}

#languages .item,
#skills .item,
#interests .item {
    width: 15em;
    padding: 0 0.5em 0.5em 0;
    border-bottom: none;
}

#skills .item {
    width: 16em;
}

#skills .item .keywords {
    width: 15em;
}

/* Skill chart */

.level {
    margin-bottom: 0.5em;
}

.level em {
    padding-left: 0.2em;
}

.level .bar {
    border: 1px solid #ddd;
    display: block;
    width: 10em;
    height: 5px;
    position: relative;
}

.level .bar::after {
    position: absolute;
    content: " ";
    top: 0;
    left: 0;
    background: black;
    height: 5px;
}

.level.beginner .bar::after {
    background: #eb5f51;
    width: 2.5em;
}

.level.intermediate .bar::after {
    background: #ffdf1f;
    width: 5em;
}

.level.advanced .bar::after,
.level.fluent .bar::after {
    background: #5cb85c;
    width: 7.5em;
}

.level.master .bar::after,
.level.native.speaker .bar::after {
    background: #59c596;
    width: 10em;
}

#references .item {
    padding-left: 0.5em;
    border-left: 5px solid #ff6d1f;
}

.toggle-item {
    display: none;
}

.section>section>section {
    margin-bottom: 0.5rem;
}

/******************
*	HELPER CLASSES
******************/

.clear::after {
    content: "";
    display: table;
    clear: both;
}

.display {
    display: block;
    opacity: 1 !important;
}

/****************
*		TABLET
****************/

@media screen and (min-width: 602px) {
    #resume {
        width: 80%;
        margin: 0 auto;
    }

    .section header .date {
        float: right;
        font-weight: 600;
        color: #000;
    }
}

/****************
*		LAPTOP
****************/

@media screen and (min-width: 1025px) {
    li {
        margin-left: 1.5em;
    }

    #resume {
        width: 820px;
        margin: 2rem auto;
    }

    .section>section>header .space-left {
        opacity: 1;
        cursor: pointer;
    }

    .section>section:not(.main-summary) {
        margin-left: 1.67rem;
    }

    .toggle-item {
        transform: translate(-9999px);
    }

    .toggle-item+label {
        display: block;
    }

    .toggle-item:checked+label:after {
        content: "\f0d7";
    }

    .toggle-item+label:after {
        float: left;
        cursor: pointer;
        margin-left: -20px;
        color: #aaa;
        font-size: 16px;
        font-weight: 900;
        font-family: "Font Awesome 5 Free";
        content: "\f0da";
    }

    .toggle-item~.item {
        height: 0;
        opacity: 0;
    }

    .toggle-item:checked~.item {
        height: auto;
        opacity: 1;
        transition: all 0.5s linear;
    }

    .company::before,
    .institution::before,
    .organization::before,
    .awarder::before {
        content: "| ";
    }

    .header-left {
        float: left;
        width: 70%;
        word-break: normal;
    }

    .section header .date {
        padding: 0.2em;
    }

    .display {
        display: none;
    }

    .display:not(.none) {
        display: block;
    }
}

@media print {
    #resume {
        margin: 0.1em;
        padding: 0.1em;
        -ms-word-wrap: break-word;
        word-wrap: break-word;
        line-height: 1.25;
    }

    @page {
        margin: 1cm 1.4cm;
    }

    .item-count {
        display: none;
    }

    .company::before,
    .institution::before,
    .organization::before,
    .awarder::before {
        content: "at ";
    }

    .main-summary {
        padding: 0;
        background: transparent;
    }

    .section {
        margin: 0.8rem 0;
        padding: 0;
    }

    .section header {
        padding-bottom: 0.15rem;
    }

    .section .location {
        padding-bottom: 0.15rem;
    }

    .section>section>section {
        margin: 0 0 1em 0;
    }

    .section>section>section:last-of-type {
        margin: 0;
    }

    .stack-overflow::after {
        content: "";
    }

    .fa.social {
        color: #828386;
    }

    ul {
        margin-top: 0.4em;
    }

    ul,
    li {
        padding: 0;
    }

    ul.keywords li,
    ul.courses li {
        margin: 0;
        padding: 0;
        font-size: 0.8rem;
        background: transparent;
    }

    ul.keywords li::after,
    ul.courses li::after {
        padding: 0 0 0 0.1rem;
        content: " |";
    }

    ul.keywords::before,
    ul.courses::before {
        font-size: 0.8rem;
        font-weight: 600;
    }

    #skills .item {
        width: calc(100% / 3);
        padding: 0;

        .name {
            font-weight: 500 !important;
        }
    }

    .highlights {
        margin: 0.5em 0 0 0;
    }

    ul.keywords::before {
        content: "Skills acquired: ";
    }

    #skills .keywords::before {
        content: none;
    }

    .section p {
        margin: 0;
        padding: 0;
    }

    ul.courses::before {
        content: "Major courses: ";
    }

    ul.keywords li:last-of-type::after,
    ul.courses li:last-of-type::after {
        content: "";
    }

    .level em {
        font-style: normal;
        padding: 0.1em 0;
    }

    .level .bar {
        display: none;
    }

    #profiles .item {
        padding: 0;
    }

    .item.display {
        display: block;
        opacity: 1 !important;
    }

    .fa-map-marker-alt:before {
        padding-left: 0.1em;
    }
}

/** added by hearsid to allow wkhtmltopdf to create correct PDF, zoom 5 **/

#skills,
#languages {
    display: block;
}

#skills .item,
#languages .display {
    display: inline-block;
    width: 30%;
    vertical-align: top;
}

::v-deep {
    .vue-horizontal-timeline {
        box-shadow: none !important;
        section.timeline {
            padding: 0px;
            height: 170px !important;
            font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
            .title {
                font-size:12px;
            }
            .content {
                font-size: 11px;
            }
            li {
                background: #ccc !important;
                width: 110px !important;
                .time {
                    border: 1px solid #e6e6e6 !important;
                    padding: 0px !important;
                }
            }
            ol {
                padding: 80px 0 80px 0px !important;
            }
            ol li:not(:last-child)::after {
                background: #ccc ;
                left: calc(100% - 70px) !important;
            }

        }
    }
}
</style>
