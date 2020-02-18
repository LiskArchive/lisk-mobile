
## Table of Contents
<!-- vim-markdown-toc GFM -->

* [How to contribute?](#how-to-contribute)
* [Finding first issue](#finding-first-issue)
* [Reporting issues](#reporting-issues)
* [Creating commits](#creating-commits)
* [Pull Requests](#pull-requests)
* [Creating branch](#creating-branch)
* [Tests](#tests)

<!-- vim-markdown-toc -->
## How to contribute

First and foremost, we would like to thank you for taking the time to contribute to this project. :tada::tada::tada:
We try to create a stable project, fix bugs and add new features continuously. You can help us do more.

Before you start, read the **[README.md](/README.md)** file for info on the project and how to set it up.

## Finding first issue
Go to [issues tab](https://github.com/LiskHQ/lisk-mobile/issues) and look for 

*✏️ `good first issue`* - it is a label for tasks that are perfect for people who want to start with lisk-mobile.

## Reporting issues

 1. Check if problem already exist in [issues tab](https://github.com/LiskHQ/lisk-mobile/issues)
 2. If not, create a new [issue](https://github.com/LiskHQ/lisk-mobile/issues/new)
 3. Fill our [template](/.github/issue_template.md)
 4. Click `Submit new issue`
##### Guidance

 * Include screenshots or animated GIF
 * Use a clear and descriptive title
 * Provide OS and browser version

##### Example
![Alt text](./docs/assets/issue.png?raw=true "Perfect Issue")

:heavy_exclamation_mark: Issues created that are not relevant to this project will be closed immediately.

## Writing some code!

Contributing to a project on Github is pretty straight forward. If this is you're first time, these are the steps you should take.

- Fork this repo.

Read the code available and apply your changes according to the issue you're working on! You're change should not break the existing code and should pass the tests.

Start from the branch that **matches issue version** ex. `0.1.0` 
If there is no issue version start from `development`.
`git checkout development`
Create a new branch under the name of the issue and work in there. Remember about branch naming convention `[issue number]-ticket-description`
ex. `git checkout -b 15-create-documentation`

## Creating commits
* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

##### Before creating PR make use that:
 - All conflicts are resolved
 - The PR follows our [Test guide](/LiskHQ/lisk-mobile/blob/development/docs/TEST_GUIDE.md)

When you're done, submit a pull request and for one of the maintainers to check it out. We would let you know if there is any problem or any changes that should be considered.
## Pull Requests
 - Title
   - Use the imperative mood ("Fix bug" not "Fixed bug")
   - Use this structure `[What the PR is about] - Closes #[issue number]` it will automatically close issue after PR will get merged.
   ex. `Fix bug - Closes #123`
- Description
    - Fill our [description template](/.github/pull_request_template.md)
- Labels
    - Use labels accordingly to current condition of PR
      - :eye: `pending review` - When PR is ready to Review
      - :building_construction: `in progress` - When there are still some changes to do on your PR
      - :white_check_mark: `ready` - After your PR gets approved and merged
- Base branch
  - Make sure that base branch of PR is the same one as issue version project, e.g. the branch for Project `Version 0.1.0` is `0.1.0`.
- Projects
  - Assign version according to issue version
  - Assign sprint according to issue sprint

##### Guidance

 * Please use `rebase` instead of `merge` for resolving conflicts
 * Make sure that Jenkins build passes
 * Remember to delete branch after successfully merging the PR.
##### Example
![Alt text](./docs/assets/pr.png?raw=true "Perfect PR")

### Creating branch
We use naming convention `[issue number]-[what-the-ticket-is-about]`.
:heavy_exclamation_mark: Remember to use `-` instead of `_`.
ex. `15-create-documentations`

## Tests

We've written tests and you can run them to assure the stability of the code, just try running `npm run test`.
If you're adding a new functionality please include tests for it.

