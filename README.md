Intelligence is an A.I. model built from scratch to test out my understanding of
human and animal actions and thought processes.

Intelligence is implemented in javascript to allow for easy
testing and distribution (no compiling needed). Eventually
it would be nice to see this implemented in a faster, compiled
language such as C.

Intelligence has a number of components:

**Mind** is the brain making all decisions in Intelligence and the core of the
system.

Mind needed a game to play for testing. For this reason
**Earth** was added as a playground for Intelligence.

Intelligence in enslaved to **Body**. Body provides Intelligence with its
basic inputs.

### What Intelligence is Trying to Do

- Make Decisions based on inputs and past experience
- Develop a System that assumes as little as possible
- Create a generic, module based system that can model nearly anything

### What Intelligence is *not* Trying to Do

- Improve algorithm efficiency organically (Somewhere down the line!)

### Basic Assumptions Intelligence Makes

- Mind understands a need to minimize **Discomfort**
- Mind bases future actions on past experience and current inputs
- Mind processes in the following order: Input -> Process -> Action -> Result -> Store (rather than Result -> Store -> Input -> Process -> Action)

### Basic Assumptions Intelligence Does *not* Make

- Mind understands inputs other than Discomfort
- Mind understands results of actions

### Additional Assumptions made in v1.0

- Body understands how to eat and Mind need not figure that out for itself

### Intelligence v1.0

Earth v1.0 is a finite, looping 2D space more like a torus than a sphere. Each
cell on Earth contains nothing or food.

Body v1.0 can Eat, increases hunger, a key in the Discomfort dictionary,
when it does not eat, and **Dies** when it runs out of energy. Body can gather
the following inputs:

- The contents of the eight **Locales** immediately surrounding Body
- Its current Hunger

Mind v1.0 is a combination of a **Preprocessor**, a **Consciousness**, and a
**Memory**.

Preprocessor v1.0 does nothing now but is in place for processing of inputs
prior to the passing of them to Mind.

Consciousness v1.0 is a processor that does the following:

- Retrieves inputs from Preproccessor or **Short Term Memory**
- Retrieves from Memory information related to those inputs
- Executes the action associated with those inputs OR Executes a random action if Memory returned nothing
- Retrieves inputs from Preprocessor
- Calculates a **Desirability** for that input-action-result
- Stores Input-Action-Result in Memory

Memory v1.0 is in essence a dictionary mapping Input to Action, Result, and
Desirability. Memory can look up inputs, store new entires, and modify existing
entries. If two identical inputs have different actions or results they are both
stored.


### Definitions

##### Mind
Mind is the brain behind this AI

##### Body
Body is the corporal weight hung around Mind's neck. Body is also Mind's only
source of input.

##### Earth
Earth is the world in which Intelligence is tested.

##### Discomfort
Discomfort is a collection of all of the inputs deamed unfavorable by body and
the only input Mind is assumed to understand in any way.

##### Death
Death is the end of a test round. Mind is reset upon Death, preventing Mind from
learning from past lifetimes.

##### Locales
Locales are specific locations on Earth. For now, they are simply squares on a
2D map.

##### Preprocessor
Preprocessor is an object that takes inputs from Body and modifies them for
use by Mind.

##### Consciousness
Consciousness is the input processing mechanism that then triggers actions.

##### Memory
Memory is the storage system used my consciousness. It is our reference to the
past.

##### Short Term Memory
Short Term Memory is the limited collection of things that Consciousness can store
between runs.

##### Desirability
Desirability is a measure (between 0 and 1) of the success of an action. If an
input-action pair has a high desirability then its outcome was favorable and it
should be repeated.
