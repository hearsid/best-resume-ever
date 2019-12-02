<template>
  <div class="resume">
    <div class="banner">
      <div
        class="banner__fullname"
      >{{ person.name.first }} {{ person.name.middle }} {{ person.name.last }}</div>
      <div class="banner__position">{{ person.position }}</div>
      <!-- <div
        v-if="person.birth"
        class="banner__location"
      >{{ lang.born }} {{person.birth.year}} {{ lang.bornIn }} {{person.birth.location}}</div> -->
    </div>

    <div class="content">
      <div class="content__left">
        <div v-if="person.skills" class="section">
          <div class="section-headline">{{ lang.skills }}</div>

          <div class="section-content-grid">
            <div
              v-for="(skill, index) in person.skills"
              class="grid-item"
              :key="index"
              :href="skill.url"
            >
              <span class="squarred-grid-item">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-headline">{{ lang.contact }}</div>

          <div class="section-content section-content--plain">
            <div class="section-link">
              <i class="section-link__icon material-icons">business</i>
              {{ person.contact.city }}
            </div>

            <a class="section-link" :href="contactLinks.email">
              <i class="section-link__icon material-icons">mail</i>
              {{ person.contact.email }}
            </a>

            <div class="section-link">
              <i class="section-link__icon material-icons">phone</i>
              {{ person.contact.phone }}
            </div>

            <a v-if="person.contact.website" class="section-link" :href="person.contact.website">
              <i class="section-link__icon fa fa-globe"></i>
              {{ person.contact.website }}
            </a>

            <a v-if="person.contact.linkedin" class="section-link" :href="contactLinks.linkedin">
              <i class="section-link__icon fab fa-linkedin"></i>
              {{ person.contact.linkedin }}
            </a>

            <a v-if="person.contact.github" class="section-link" :href="contactLinks.github">
              <i class="section-link__icon fab fa-github"></i>
              {{ person.contact.github }}
            </a>

            <a v-if="person.contact.medium" class="section-link" :href="contactLinks.medium">
              <i class="section-link__icon fab fa-medium"></i>
              {{ person.contact.medium }}
            </a>

            <a v-if="person.contact.stackoverflow" class="section-link" :href="contactLinks.stackoverflow">
              <i class="section-link__icon fab fa-stack-overflow"></i>
              {{ person.contact.stackoverflow }}
            </a>

            <a v-if="person.contact.stackoverflow" class="section-link" :href="contactLinks.hackerrank">
              <i class="section-link__icon fab fa-hackerrank"></i>
              {{ person.contact.hackerrank }}
            </a>
          </div>
        </div>
        <div class="section">
          <div class="section-headline">{{ lang.about }}</div>

          <div class="section-content section-content--plain">
            {{ person.about }}
            <br />
            <br />
            {{ person.knowledge }}
          </div>
        </div>
      </div>

      <div class="content__right">
        <div class="section">
          <div class="section-headline">
            <i class="section-headline__icon material-icons">work</i>
            {{ lang.experience }}
          </div>

          <div class="section-content">
            <div
              v-for="(experience, index) in person.experience"
              :key="index"
              class="section-content__item"
              :href="experience.website"
            >
              <md-card>
                <md-card-header>
                  <div class="md-subhead">{{ experience.position }}</div>
                  <div class="md-title">{{ experience.company }}</div>
                </md-card-header>

                <md-card-content>
                  <span class="section-content__subheader">
                    <span class="section-content__plain">{{ experience.location }}</span>
                  </span>

                  <div class="section-content__text">{{ experience.timeperiod }}</div>
                  <span class="section-content__text--light">{{ experience.description }}</span>
                </md-card-content>
              </md-card>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-headline">
            <i class="section-headline__icon material-icons">school</i>
            {{ lang.education }}
          </div>

          <div class="section-content">
            <div
              v-for="(education, index) in person.education"
              class="section-content__item"
              :key="index"
              :href="education.website"
            >
              <md-card>
                <md-card-header>
                  <div class="md-subhead">{{ education.school }}</div>
                  <div class="md-title">{{ education.degree}}</div>
                </md-card-header>

                <md-card-content>
                  <div class="section-content__text">{{ education.timeperiod }}</div>
                  <span class="section-content__text--light">{{ education.description }}</span>
                </md-card-content>
              </md-card>
            </div>
          </div>
        </div>

        <div v-if="person.projects" class="section">
          <div class="section-headline">
            <i class="section-headline__icon material-icons">code</i>
            {{ lang.projects }}
          </div>

          
          <div class="section-content">
            <div
              v-for="(project, index) in person.projects"
              :key="index"
              :href="project.url"
            >
              <md-card>
                <md-card-header>
                  <div class="md-title">{{ project.name }}</div>
                </md-card-header>
                <md-card-content>
                  <div class="section-content__text">{{ project.platform }}</div>
                  <span class="section-content__text--light">{{ project.description }}</span>
                </md-card-content>
              </md-card>
            </div>
          </div>
        </div>

        <div v-if="person.contributions" class="section">
          <div class="section-headline">
            <i class="section-headline__icon fa fa-heart"></i>
            {{lang.contributions}}
          </div>

          <div class="section-content-grid">
            <div
              v-for="(contribution, index) in person.contributions"
              class="section-content"
              :key="index"
              :href="contribution.url"
            >

              <md-card>
                <md-card-header>
                  <div class="md-title">{{ contribution.name }}</div>
                </md-card-header>
                <md-card-content>
                  <div class="section-content__text">{{ contribution.url }}</div>
                  <span class="section-content__text--light">{{ contribution.description }}</span>
                </md-card-content>
              </md-card>
            </div>
          </div>
        </div>
      </div>
    </div>

    <img class="picture" />
  </div>
</template>

<script>
import Vue from 'vue';
import { getVueOptions } from './options';

const name = 'cool-extended';
export default Vue.component(name, getVueOptions(name));
</script>

<style lang="less" scoped>
@accent-color: #34495e;
@banner-color: #039be5;
@banner-height: 120px;
@picture-size: 120px;
@picture-offset: 55px;
@base-padding: 30px;
@left-column-width: 340px;

a {
  color: inherit;
  cursor: pointer;
  text-decoration-line: none;

  &:visited {
    color: inherit;
  }
}

.resume {
  position: relative;
  font-family: "Geneva" !important;
  font-size: 0.9em;
}

.picture {
  position: absolute;
  top: @banner-height - @picture-offset;
  left: 270px; //@left-column-width + @base-padding * 2 - @picture-size / 2;
  height: @picture-size;
  width: @picture-size;
  border-radius: 50%;
  border: 5px solid @accent-color;
  content: url("../../resume/id.jpg");
  z-index: 2;
}

.banner {
  // width: calc(100% - @base-padding * 2);
  height: @banner-height;
  padding: @base-padding;
  background-color: @banner-color;
  /*
    background-image: url('../../resume/banner.png');
    background-repeat: no-repeat;
    background-size: cover;
  */
  color: white;

  &__fullname {
    font-size: 32px;
  }

  &__position {
    font-size: 16px;
  }

  &__location {
    font-size: 12px;
  }
}

.content {
  display: flex;
  width: 100%;
  height: 100%;

  &__left,
  &__right {
    // height: 100%;
    padding: @base-padding;
  }

  &__left {
    width: @left-column-width;
    color: rgba(255, 255, 255, 0.59);
    background-color: @accent-color;

    .section-headline {
      color: white;
    }
  }

  &__right {
    flex: 1;
  }
}

.section {
  margin: 20px 0;
}

.section-link,
.section-headline {
  display: flex !important;
  align-items: center;
  color: @accent-color;
  display: inline-block;
  font-size: 1.2em;
  margin: 8px 0;

  &__icon {
    margin-right: 8px;
    font-size: 1.4em;
  }
}

.section-link {
  font-size: 1.1em;
  color: rgba(255, 255, 255, 0.59) !important;

  &__icon {
    color: white;
  }
}

.section-content {
  margin-top: 5px;
  padding-left: 32px;
  font-size: 14px;

  &__item {
    display: block;
    margin-bottom: 5px;
  }

  &__header {
    display: block;
    font-size: 1.1em;
    font-weight: 500;
  }

  &__subheader {
    display: block;
    font-weight: 400;
  }

  &__plain,
  &__text {
    display: block;
    font-size: 12px;

    &--light {
      font-size: 12px;
    }
  }

  &__plain {
    display: inline;
    font-weight: 300;
  }

  &__item-grid {
    flex: 1 1 0;
    margin-bottom: 5px;
    padding-right: 5px;
  }

  &--plain {
    padding: 0;
  }
}

.section-content-grid {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  margin-bottom: 5px;
}

.grid-item {
  padding-right: 5px;
}

.squarred-grid-item {
  display: block;
  border: 1px solid white;
  color: white;
  margin-top: 5px;
  padding: 5px;
}
</style>
